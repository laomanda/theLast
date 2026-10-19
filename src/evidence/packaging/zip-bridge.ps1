param(
  [Parameter(Mandatory=$true)][ValidateSet('Create','Inspect')][string]$Mode,
  [Parameter(Mandatory=$true)][string]$ArchivePath,
  [string]$Root,
  [string]$Entries,
  [string]$ExtractRoot
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$utf8 = New-Object System.Text.UTF8Encoding($false)
function Get-Sha256([byte[]]$Bytes) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try { return ([BitConverter]::ToString($sha.ComputeHash($Bytes))).Replace('-','').ToLowerInvariant() }
  finally { $sha.Dispose() }
}
if ($Mode -eq 'Create') {
  if ([System.IO.File]::Exists($ArchivePath)) { throw 'OUTPUT_COLLISION' }
  $stream = [System.IO.File]::Open($ArchivePath, [System.IO.FileMode]::CreateNew)
  try {
    $zip = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create, $false, $utf8)
    try {
      foreach ($name in ($Entries -split '\|' | Sort-Object)) {
        if (-not $name -or $name.StartsWith('/') -or $name.Contains('..') -or $name.Contains('\')) { throw 'UNSAFE_ARCHIVE_ENTRY' }
        $source = Join-Path $Root ($name.Replace('/', [IO.Path]::DirectorySeparatorChar))
        $bytes = [System.IO.File]::ReadAllBytes($source)
        $entry = $zip.CreateEntry($name, [System.IO.Compression.CompressionLevel]::Optimal)
        $entry.LastWriteTime = [DateTimeOffset]::new(2000,1,1,0,0,0,[TimeSpan]::Zero)
        $target = $entry.Open(); try { $target.Write($bytes,0,$bytes.Length) } finally { $target.Dispose() }
      }
    } finally { $zip.Dispose() }
  } finally { $stream.Dispose() }
  exit 0
}
$archive = [System.IO.Compression.ZipFile]::OpenRead($ArchivePath)
try {
  $seen = @{}
  $rows = @()
  foreach ($entry in $archive.Entries) {
    $name = $entry.FullName
    if (-not $name -or $name.StartsWith('/') -or $name.StartsWith('\') -or $name.Contains('\') -or ($name -split '/') -contains '..' -or $name -match '^[A-Za-z]:') { throw 'UNSAFE_ARCHIVE_ENTRY' }
    $key = $name.ToLowerInvariant(); if ($seen.ContainsKey($key)) { throw 'DUPLICATE_ARCHIVE_ENTRY' }; $seen[$key] = $true
    $input = $entry.Open(); try { $memory = New-Object IO.MemoryStream; $input.CopyTo($memory); $bytes = $memory.ToArray(); $memory.Dispose() } finally { $input.Dispose() }
    if ($ExtractRoot) {
      $destination = [IO.Path]::GetFullPath((Join-Path $ExtractRoot ($name.Replace('/', [IO.Path]::DirectorySeparatorChar))))
      $safeRoot = [IO.Path]::GetFullPath($ExtractRoot) + [IO.Path]::DirectorySeparatorChar
      if (-not $destination.StartsWith($safeRoot, [StringComparison]::OrdinalIgnoreCase)) { throw 'ZIP_SLIP' }
      [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($destination)) | Out-Null
      [IO.File]::WriteAllBytes($destination, $bytes)
    }
    $rows += [pscustomobject]@{ path=$name; bytes=$bytes.Length; sha256=(Get-Sha256 $bytes) }
  }
  $rows | Sort-Object path | ConvertTo-Json -Compress
} finally { $archive.Dispose() }
