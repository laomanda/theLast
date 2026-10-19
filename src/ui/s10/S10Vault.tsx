"use client";

import { ContactShadows, Html, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Component, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
// @ts-expect-error The approved runtime helper is an asset-package .mjs module without a declaration file.
import { createWorldAxisHingeAdapter as createWorldAxisHingeAdapterUntyped } from "../../../assets-final/vault/runtime/hinge.mjs";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

const VAULT_PUBLIC_PATH = "/assets/vault/vault-final.glb";
const VAULT_SHA256 = "9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B";
type HingeAdapter = { setAngleDegrees: (degrees: number) => void; reset: () => void };
const createWorldAxisHingeAdapter = createWorldAxisHingeAdapterUntyped as unknown as (
  three: typeof THREE,
  pivot: THREE.Object3D,
  axis: THREE.Vector3,
  sign?: number,
) => HingeAdapter;

function StudioCamera({ open }: { open: boolean }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const mobile = size.width < 700;
    const targetZ = mobile ? (open ? 6.15 : 5.45) : (open ? 5.15 : 4.45);
    const targetX = mobile ? 2.45 : 2.8;
    const targetY = mobile ? 1.7 : 1.95;
    const tween = gsap.to(camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: open ? 0.55 : 0,
      ease: "power2.out",
      onUpdate: () => camera.lookAt(0, 0.62, 0),
    });
    camera.lookAt(0, 0.62, 0);
    return () => { tween.kill(); };
  }, [camera, open, size.width]);
  return null;
}

function VaultModel({
  openRequest,
  reducedMotion,
  onReady,
  onOpened,
  onInvalidate,
}: {
  openRequest: number;
  reducedMotion: boolean;
  onReady: () => void;
  onOpened: () => void;
  onInvalidate: () => void;
}) {
  const gltf = useGLTF(VAULT_PUBLIC_PATH) as { scene: Group };
  const root = gltf.scene;
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const readyRef = useRef(false);
  const adapterRef = useRef<HingeAdapter | null>(null);
  const pivotRef = useRef<THREE.Object3D | null>(null);

  useLayoutEffect(() => {
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (Array.isArray(object.material)) object.material = object.material.map((material: THREE.Material) => material.clone());
      else if (object.material) object.material = object.material.clone();
    });
    const pivot = root.getObjectByName("Door_Hinge_Pivot");
    if (!pivot) throw new Error("Vault V2 contract missing Door_Hinge_Pivot");
    pivotRef.current = pivot;
    adapterRef.current = createWorldAxisHingeAdapter(THREE, pivot, new THREE.Vector3(0, 1, 0), 1);
    adapterRef.current.setAngleDegrees(0);
    if (!readyRef.current) { readyRef.current = true; onReady(); }
    return () => {
      timelineRef.current?.kill();
      adapterRef.current?.reset();
      adapterRef.current = null;
      pivotRef.current = null;
    };
  }, [onReady, root]);

  useLayoutEffect(() => {
    if (!openRequest || !adapterRef.current) return;
    timelineRef.current?.kill();
    if (reducedMotion) {
      adapterRef.current.setAngleDegrees(92);
      onInvalidate();
      onOpened();
      return;
    }
    const state = { degrees: 0 };
    timelineRef.current = gsap.to(state, {
      degrees: 92,
      duration: 1.85,
      ease: "power3.inOut",
      onUpdate: () => {
        adapterRef.current?.setAngleDegrees(state.degrees);
        onInvalidate();
      },
      onComplete: onOpened,
    });
    return () => { timelineRef.current?.kill(); };
  }, [onInvalidate, onOpened, openRequest, reducedMotion]);

  return <primitive object={root} />;
}

class VaultErrorBoundary extends Component<
  Readonly<{ children: React.ReactNode; onError: () => void }>,
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function VaultCanvas({
  openRequest,
  opened,
  reducedMotion,
  onReady,
  onOpened,
  onFailure,
}: {
  openRequest: number;
  opened: boolean;
  reducedMotion: boolean;
  onReady: () => void;
  onOpened: () => void;
  onFailure: () => void;
}) {
  const invalidateRef = useRef<(() => void) | null>(null);
  const invalidate = useCallback(() => invalidateRef.current?.(), []);
  return <Canvas
    data-testid="s10-vault-canvas"
    camera={{ position: [2.8, 1.95, 4.45], fov: 38, near: 0.1, far: 100 }}
    dpr={[1, 1.5]}
    frameloop={openRequest > 0 && !opened ? "always" : "demand"}
    shadows="soft"
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.08 }}
    onCreated={({ invalidate }) => { invalidateRef.current = invalidate; invalidate(); }}
  >
    <StudioCamera open={openRequest > 0} />
    <ambientLight intensity={0.72} color="#A79DCD" />
    <hemisphereLight args={["#E6D4AC", "#352B37", 1.12]} />
    <directionalLight castShadow position={[3.5, 5, 4]} intensity={2.4} color="#F6F1E8" shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
    <directionalLight position={[-3, 2.2, -2]} intensity={0.65} color="#A79DCD" />
    <Suspense fallback={<Html center><span className="s10-loading-label">Vault memuat...</span></Html>}>
      <VaultErrorBoundary onError={onFailure}>
        <VaultModel
          openRequest={openRequest}
          reducedMotion={reducedMotion}
          onReady={onReady}
          onOpened={onOpened}
          onInvalidate={invalidate}
        />
      </VaultErrorBoundary>
    </Suspense>
    <ContactShadows position={[0, -0.01, 0]} opacity={0.34} scale={3.8} blur={1.5} far={2.8} frames={1} color="#161217" />
  </Canvas>;
}

function VaultFallback({ opened }: { opened: boolean }) {
  return <div className={`s10-fallback-object${opened ? " is-open" : ""}`} aria-label={opened ? "Vault terbuka" : "Vault tertutup"}>
    <div className="s10-fallback-door"><span className="s10-fallback-lock" aria-hidden="true">◌</span></div>
    {opened ? <div className="s10-fallback-letter" aria-hidden="true">✦</div> : null}
  </div>;
}

function PinControl({
  pin,
  setPin,
  disabled,
  onSubmit,
}: {
  pin: string;
  setPin: (value: string) => void;
  disabled: boolean;
  onSubmit: () => void;
}) {
  const append = (digit: string) => { if (pin.length < 6) setPin(`${pin}${digit}`); };
  return <div className="s10-pin-panel" aria-label="Panel kode Vault">
    <label htmlFor="s10-pin">Masukkan kode</label>
    <input id="s10-pin" data-testid="s10-pin-input" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} aria-describedby="s10-pin-hint" disabled={disabled} />
    <p id="s10-pin-hint">Kode ini bagian dari cerita, bukan pengaman data.</p>
    <div className="s10-keypad" aria-label="Tombol angka">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => <button key={digit} type="button" onClick={() => append(digit)} disabled={disabled} aria-label={`Angka ${digit}`}>{digit}</button>)}
      <button type="button" onClick={() => setPin("")} disabled={disabled || pin.length === 0}>Hapus</button>
      <button type="button" onClick={onSubmit} disabled={disabled || pin.length !== 6}>Buka</button>
    </div>
  </div>;
}

export function S10Vault() {
  const reducedMotion = usePrefersReducedMotion();
  const vaultStatus = useExperienceStore((state) => state.vault.status);
  const invalidAttempts = useExperienceStore((state) => state.vault.invalidAttempts);
  const [pin, setPin] = useState("");
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [assetFailed, setAssetFailed] = useState(false);
  const [openRequest, setOpenRequest] = useState(0);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | null = null;
    let cancelled = false;
    let available = false;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      available = true;
    } catch {
      available = false;
    } finally {
      renderer?.dispose();
      renderer?.domElement.remove();
    }
    const timer = window.setTimeout(() => {
      if (!cancelled) setWebglAvailable(available);
    }, 0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  const markReady = useCallback(() => {
    if (experienceRuntime.getState().vault.status === "loading") void experienceRuntime.dispatch({ type: "VAULT_READY" });
  }, []);
  const handleOpened = useCallback(() => setOpened(true), []);
  const handleFailure = useCallback(() => setAssetFailed(true), []);
  const handleSubmit = async () => {
    if (pin.length !== 6 || opened || vaultStatus === "doorOpening") return;
    setError(null);
    const result = await experienceRuntime.dispatch({ type: "SUBMIT_VAULT_PIN", pin });
    if (result.status !== "applied") { setError("Kode belum bisa digunakan. Coba lagi, ya."); return; }
    if (!experienceRuntime.getState().vault.pinAccepted) { setError("Kodenya belum tepat. Coba lagi, ya."); return; }
    await experienceRuntime.dispatch({ type: "BEGIN_VAULT_OPENING" });
    setOpenRequest((value) => value + 1);
  };
  const continueToLetterBoundary = async () => {
    if (!opened) return;
    await experienceRuntime.dispatch({ type: "COMPLETE_VAULT_OPENING" });
  };
  const fallback = webglAvailable === false || assetFailed;
  const isOpening = vaultStatus === "doorOpening";
  const isReady = ["ready", "pinRejected", "pinAccepted", "doorOpening"].includes(vaultStatus);

  return <main className="s10-scene" data-testid="s10-scene" data-vault-status={vaultStatus} data-reduced-motion={reducedMotion ? "true" : "false"}>
    <img className="s10-offset-accent" src="/assets/svg/signature/offset-loop-open.svg" alt="" aria-hidden="true" />
    <p className="s10-kicker">THE LAST / 10 · THE QUIET KEEPSAKE VAULT</p>
    <div className="s10-layout">
      <section className="s10-visual" aria-label="Visual Vault">
        {fallback ? <VaultFallback opened={opened} /> : webglAvailable === null ? <div className="s10-visual-loading" role="status">Menyiapkan ruang kecil ini...</div> : <VaultCanvas openRequest={openRequest} opened={opened} reducedMotion={reducedMotion} onReady={markReady} onOpened={handleOpened} onFailure={handleFailure} />}
        <p className="s10-asset-note" data-testid="s10-asset-note">VAULT V2 · {VAULT_SHA256.slice(0, 10)}</p>
      </section>
      <section className="s10-controls" aria-labelledby="s10-title">
        <p className="s10-overline">Sebuah ruang kecil untuk satu hal yang disimpan.</p>
        <h1 id="s10-title">Pelan-pelan, buka yang ada di dalam.</h1>
        <p className="s10-intro">Kode ini hanya sebuah tanda. Tidak ada yang perlu diburu.</p>
        <div className="s10-status" aria-live="polite">{isOpening ? "Kuncinya bergerak..." : opened ? "Pintunya terbuka. Suratnya menunggu untuk dipilih." : isReady ? "Ruangnya siap." : "Ruangnya sedang disiapkan."}</div>
        {!opened ? <PinControl pin={pin} setPin={setPin} disabled={!isReady || isOpening} onSubmit={handleSubmit} /> : <button type="button" className="s10-letter-action" data-testid="s10-letter-action" onClick={continueToLetterBoundary}>Pilih suratnya</button>}
        {error ? <p className="s10-error" role="alert">{error}</p> : null}
        {invalidAttempts > 0 && !opened ? <p className="s10-attempts">Masih ada waktu untuk mencoba lagi.</p> : null}
        {fallback ? <p className="s10-fallback-note">Mode visual sederhana aktif; semua langkah tetap dapat dilakukan.</p> : null}
      </section>
    </div>
  </main>;
}

