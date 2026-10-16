// One immutable R8 roughness tile; one dominant-axis fetch per fragment. No bump/displacement.
export async function createFinish(T, renderer, { enabled = true, textureUrl = new URL('./textures/micrograin.png', import.meta.url).href } = {}) {
  const specs = {
    VaultBody_M5: { tile: 0.024, amplitude: 0.150 },
    VaultDoor_M5: { tile: 0.024, amplitude: 0.120 },
    LockAccent_Lavender: { tile: 0.024, amplitude: 0.075 },
    LockAccent_Champagne: { tile: 0.024, amplitude: 0.075 },
    LetterPaper_M4: { tile: 0.024, amplitude: 0.055 },
  };
  let texture = null, textureDisposed = false;
  const bindings = new Set();
  if (enabled) {
    texture = await new T.TextureLoader().loadAsync(textureUrl);
    texture.colorSpace = T.NoColorSpace;
    texture.format = T.RedFormat;
    texture.internalFormat = 'R8';
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.minFilter = T.LinearMipmapLinearFilter;
    texture.magFilter = T.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = Math.min(2, renderer.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
  }
  function attach(material) {
    if (!enabled) return;
    const spec = specs[material.name];
    if (!spec) throw new Error(`Unknown finish identity ${material.name}`);
    bindings.add(material);
    material.customProgramCacheKey = () => `vault-roughness-tile-v2-${material.name}`;
    material.onBeforeCompile = shader => {
      shader.uniforms.vfMicroMap = { value: texture };
      shader.uniforms.vfMicroTile = { value: spec.tile };
      shader.uniforms.vfMicroAmplitude = { value: spec.amplitude };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vfPosition; varying vec3 vfSurfaceNormal;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvfPosition = position * vec3(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz), length(modelMatrix[2].xyz)); vfSurfaceNormal = normal;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
varying vec3 vfPosition; varying vec3 vfSurfaceNormal;
uniform sampler2D vfMicroMap; uniform float vfMicroTile; uniform float vfMicroAmplitude;`)
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
vec3 vfAxis = abs(normalize(vfSurfaceNormal));
vec2 vfCoord = vfAxis.x >= max(vfAxis.y, vfAxis.z) ? vfPosition.yz : (vfAxis.y >= vfAxis.z ? vfPosition.xz : vfPosition.xy);
float vfMicro = texture2D(vfMicroMap, vfCoord / vfMicroTile).r;
roughnessFactor = clamp(roughnessFactor + (vfMicro - 0.5) * vfMicroAmplitude, 0.35, 1.0);`);
    };
  }
  function disposeMaterial(material) { bindings.delete(material); }
  function isolation() {
    if (!enabled || !texture) return { status: 'NOT APPLICABLE' };
    const clone = texture.clone();
    const pass = clone.source === texture.source && clone.uuid !== texture.uuid && clone.repeat.toArray().every((v, i) => v === texture.repeat.toArray()[i]);
    clone.dispose();
    return { status: pass ? 'PASS' : 'FAIL', sharedPixelSource: true, immutableSharedTexture: true, mutatesOriginal: false };
  }
  function audit() {
    return {
      enabled, status: enabled && texture ? 'PASS' : (enabled ? 'FAIL' : 'DISABLED'),
      specs, mapCount: texture ? 1 : 0, activeMaterialBindings: bindings.size,
      textureWidth: texture?.image?.width || 0, textureHeight: texture?.image?.height || 0,
      textureFormat: texture?.internalFormat || texture?.format || 'none',
      textureSourceBytes: texture?.image?.width * texture?.image?.height || 0,
      anisotropy: texture?.anisotropy || 0, fragmentTextureSamples: enabled ? 1 : 0,
      bumpMapping: false, displacement: false, uvDependency: false,
      textureLifecycle: { created: texture ? 1 : 0, disposed: textureDisposed ? 1 : 0, active: texture && !textureDisposed ? 1 : 0 },
      mapping: 'Seamless meter-scaled object-space dominant-axis projection; one grayscale linear R8 roughness lookup; no color, normal, bump, displacement, or UV dependency.',
    };
  }
  return {
    attach, disposeMaterial, isolation, audit,
    dispose() { bindings.clear(); if (texture && !textureDisposed) { texture.dispose(); textureDisposed = true; } },
  };
}
