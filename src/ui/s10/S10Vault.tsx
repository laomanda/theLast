"use client";

import { ContactShadows, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Component, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { experienceRuntime, useExperienceStore } from "../../state/experience-store";
import { createWorldAxisHingeAdapter } from "./hinge-adapter";
import { usePrefersReducedMotion } from "../s01/S01Prelude";

const VAULT_PUBLIC_PATH = "/assets/vault/vault-final.glb";
const VAULT_SHA256 = "9BC128A9C020AA2604F5E9B6AA7A72534ADAE300506C37255196A47227DC2A2B";
type HingeAdapter = ReturnType<typeof createWorldAxisHingeAdapter>;

function StudioCamera({ open }: { open: boolean }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const mobile = size.width < 600;
    const tablet = size.width < 1000;
    const targetZ = mobile ? (open ? 4.72 : 3.92) : tablet ? (open ? 4.55 : 3.78) : (open ? 4.18 : 3.42);
    const targetX = mobile ? 1.82 : tablet ? 2.12 : 2.28;
    const targetY = mobile ? 1.3 : tablet ? 1.48 : 1.62;
    const tween = gsap.to(camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: open ? 0.55 : 0,
      ease: "power2.out",
      onUpdate: () => camera.lookAt(0, 0.57, 0),
    });
    camera.lookAt(0, 0.57, 0);
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
    adapterRef.current = createWorldAxisHingeAdapter(pivot, new THREE.Vector3(0, 1, 0), 1);
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
    camera={{ position: [2.28, 1.62, 3.42], fov: 34, near: 0.1, far: 100 }}
    dpr={[1, 1.5]}
    frameloop={openRequest > 0 && !opened ? "always" : "demand"}
    shadows
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.18 }}
    onCreated={({ invalidate }) => { invalidateRef.current = invalidate; invalidate(); }}
  >
    <StudioCamera open={openRequest > 0} />
    <ambientLight intensity={0.88} color="#B7AFD5" />
    <hemisphereLight args={["#F3E5C8", "#241E26", 1.3]} />
    <directionalLight castShadow position={[3.8, 5.2, 4.2]} intensity={2.75} color="#FFF8EA" shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
    <directionalLight position={[-3.4, 2.5, 1.2]} intensity={1.05} color="#A79DCD" />
    <pointLight position={[-1.8, 1.2, -2.4]} intensity={1.15} color="#E6D4AC" distance={7} decay={2} />
    <pointLight position={[0.25, 1.05, 1.55]} intensity={0.72} color="#F6E5BF" distance={4.5} decay={2} />
    <Suspense fallback={null}>
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
    <ContactShadows position={[0, -0.01, 0]} opacity={0.42} scale={4.4} blur={2.1} far={3.2} frames={1} color="#161217" />
  </Canvas>;
}

function VaultFallback({ opened }: { opened: boolean }) {
  return <div
    className={`s10-fallback-object${opened ? " is-open" : ""}`}
    data-testid="s10-vault-fallback"
    aria-label={opened ? "Representasi sederhana Vault dalam keadaan terbuka" : "Representasi sederhana Vault dalam keadaan tertutup"}
  >
    <span className="s10-fallback-badge">Mode visual sederhana</span>
    <div className="s10-fallback-body" aria-hidden="true">
      <div className="s10-fallback-letter">✦</div>
      <div className="s10-fallback-door"><span className="s10-fallback-lock">◌</span></div>
    </div>
    <p>{opened ? "Representasi sederhana menunjukkan ruang surat terbuka." : "Representasi sederhana menunjukkan Vault tertutup."}</p>
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
  const submissionPendingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let available = false;
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2", { powerPreference: "low-power" }) ?? probe.getContext("webgl", { powerPreference: "low-power" });
      available = context !== null;
      context?.getExtension("WEBGL_lose_context")?.loseContext();
      probe.remove();
    } catch {
      available = false;
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
  const handleFailure = useCallback(() => {
    setAssetFailed(true);
    const state = experienceRuntime.getState();
    if (state.vault.status === "loading") void experienceRuntime.dispatch({ type: "VAULT_READY" });
    if (state.vault.status === "doorOpening") setOpened(true);
  }, []);
  const fallback = webglAvailable === false || assetFailed;

  useEffect(() => {
    if (fallback && experienceRuntime.getState().vault.status === "loading") {
      void experienceRuntime.dispatch({ type: "VAULT_READY" });
    }
  }, [fallback]);

  const handleSubmit = async () => {
    if (pin.length !== 6 || opened || vaultStatus === "doorOpening" || submissionPendingRef.current) return;
    submissionPendingRef.current = true;
    setError(null);
    try {
      const result = await experienceRuntime.dispatch({ type: "SUBMIT_VAULT_PIN", pin });
      if (result.status !== "applied") { setError("Kode belum bisa digunakan. Coba lagi, ya."); return; }
      if (!experienceRuntime.getState().vault.pinAccepted) { setError("Kodenya belum tepat. Coba lagi, ya."); return; }
      const opening = await experienceRuntime.dispatch({ type: "BEGIN_VAULT_OPENING" });
      if (opening.status !== "applied") { setError("Vault belum bisa dibuka. Coba lagi, ya."); return; }
      if (fallback) setOpened(true);
      else setOpenRequest((value) => value + 1);
    } finally {
      submissionPendingRef.current = false;
    }
  };
  const continueToLetterBoundary = async () => {
    if (!opened) return;
    await experienceRuntime.dispatch({ type: "COMPLETE_VAULT_OPENING" });
  };
  const isOpening = vaultStatus === "doorOpening";
  const isReady = ["ready", "pinRejected", "pinAccepted", "doorOpening"].includes(vaultStatus);

  return <main className="s10-scene" data-testid="s10-scene" data-vault-status={vaultStatus} data-renderer-mode={fallback ? "fallback" : webglAvailable === true ? "webgl" : "probing"} data-door-state={opened ? "open" : isOpening ? "opening" : "closed"} data-reduced-motion={reducedMotion ? "true" : "false"}>
    <span className="s10-offset-accent" aria-hidden="true" />
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
        <div className="s10-status" aria-live="polite">{isOpening && !opened ? (fallback ? "Mode sederhana sedang membuka ruang surat..." : "Kuncinya bergerak...") : opened ? (fallback ? "Ruang surat terlihat dalam mode sederhana." : "Pintunya terbuka. Suratnya menunggu untuk dipilih.") : isReady ? "Ruangnya siap." : "Ruangnya sedang disiapkan."}</div>
        {!opened ? <PinControl pin={pin} setPin={setPin} disabled={!isReady || isOpening} onSubmit={handleSubmit} /> : <button type="button" className="s10-letter-action" data-testid="s10-letter-action" onClick={continueToLetterBoundary}>Pilih suratnya</button>}
        {error ? <p className="s10-error" role="alert">{error}</p> : null}
        {invalidAttempts > 0 && !opened ? <p className="s10-attempts">Masih ada waktu untuk mencoba lagi.</p> : null}
        {fallback ? <p className="s10-fallback-note">Mode visual sederhana aktif; semua langkah tetap dapat dilakukan.</p> : null}
      </section>
    </div>
  </main>;
}

