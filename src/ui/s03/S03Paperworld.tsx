"use client";

import { useEffect, useState } from "react";

type PaperEgg = {
  id: "star" | "flower" | "heart" | "token" | "popper" | "ribbon";
  label: string;
  surprise: string;
};

const PAPER_EGGS: PaperEgg[] = [
  { id: "star", label: "Buka bintang kertas", surprise: "Nineteen Cheers" },
  { id: "flower", label: "Buka bunga kertas", surprise: "Bloom Bright" },
  { id: "heart", label: "Buka hati kertas", surprise: "Stay Golden" },
  { id: "token", label: "Putar token ulang tahun", surprise: "Lucky You" },
  { id: "popper", label: "Buka party popper", surprise: "Make Wishes" },
  { id: "ribbon", label: "Tarik pita kertas", surprise: "Keep Shining" },
];

export const S03_PAPER_EGG_COUNT = PAPER_EGGS.length;

function PaperGlyph({ id }: Pick<PaperEgg, "id">) {
  if (id === "star") {
    return <svg viewBox="0 0 88 88" aria-hidden="true"><path className="pw-paper" d="m44 7 10 25 27 1-21 17 7 27-23-15-23 15 7-27L7 33l27-1Z" /></svg>;
  }
  if (id === "flower") {
    return <svg viewBox="0 0 88 88" aria-hidden="true"><g className="pw-petals"><path className="pw-paper pw-petal pw-petal--one" d="M44 43C17 42 12 21 26 17c11-3 17 11 18 26Z" /><path className="pw-paper pw-petal pw-petal--two" d="M46 44C44 17 64 8 72 20c6 10-8 19-26 24Z" /><path className="pw-paper pw-petal pw-petal--three" d="M45 46c26-6 37 12 26 24-9 9-20-4-26-24Z" /><path className="pw-paper pw-petal pw-petal--four" d="M42 46c-20 17-37 6-31-8 5-11 20-7 31 8Z" /></g><circle className="pw-center" cx="44" cy="45" r="9" /></svg>;
  }
  if (id === "heart") {
    return <svg viewBox="0 0 88 88" aria-hidden="true"><path className="pw-paper pw-heart-base" d="M44 73 16 47C2 33 10 12 27 14c8 1 14 8 17 14 4-7 10-14 18-14 17-2 25 19 11 33Z" /><path className="pw-heart-fold" d="M44 27v44" /><path className="pw-heart-fold pw-heart-fold--cross" d="m20 43 24 28 24-28" /></svg>;
  }
  if (id === "token") {
    return <svg viewBox="0 0 88 88" aria-hidden="true"><g transform="translate(44 44)"><ellipse className="pw-center" cx="0" cy="-10" rx="6" ry="10" /><ellipse className="pw-center" cx="9.5" cy="-3" rx="6" ry="10" transform="rotate(72 9.5 -3)" /><ellipse className="pw-center" cx="6" cy="8" rx="6" ry="10" transform="rotate(144 6 8)" /><ellipse className="pw-center" cx="-6" cy="8" rx="6" ry="10" transform="rotate(216 -6 8)" /><ellipse className="pw-center" cx="-9.5" cy="-3" rx="6" ry="10" transform="rotate(288 -9.5 -3)" /><circle className="pw-paper pw-flower-center" cx="0" cy="0" r="5" /></g></svg>;
  }
  if (id === "popper") {
    return <svg viewBox="0 0 88 88" aria-hidden="true"><path className="pw-paper" d="m23 67 16-41 25 25Z" /><path className="pw-crease" d="m39 26 25 25M21 17l6 12m19-18-2 13m23 2-10 8m21 14-13 1" /><path className="pw-confetti" d="m57 21 6-8m8 17 10-2m-1 18 7 6" /></svg>;
  }
  return <svg viewBox="0 0 88 88" aria-hidden="true"><path className="pw-ribbon" d="M14 27c12-17 31 0 22 14-11 18-29-2-7-12 19-8 37 7 34 26-2 15-17 16-23 5" /><path className="pw-crease" d="M16 62c10-8 22-4 28 4" /></svg>;
}

interface S03PaperworldProps {
  onDiscoveryChange?: (count: number) => void;
  reminderKey?: number;
}

export function S03Paperworld({ onDiscoveryChange, reminderKey = 0 }: S03PaperworldProps) {
  const [activeId, setActiveId] = useState<PaperEgg["id"] | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<PaperEgg["id"][]>([]);
  const [activationId, setActivationId] = useState(0);

  useEffect(() => {
    onDiscoveryChange?.(discoveredIds.length);
  }, [discoveredIds.length, onDiscoveryChange]);

  const activateEgg = (id: PaperEgg["id"]) => {
    setActiveId(id);
    setActivationId((current) => current + 1);
    setDiscoveredIds((current) => {
      if (current.includes(id)) return current;
      return [...current, id];
    });
  };

  return (
    <div className="s03-paperworld" aria-label="Kejutan ulang tahun kecil">
      {reminderKey > 0 && (
        <div key={reminderKey} className="s03-sky-reminder" role="status" aria-live="polite">
          <svg viewBox="0 0 700 120" aria-hidden="true" focusable="false">
            <path className="s03-banner-tail" d="M58 35h310l-28 25 28 25H58l28-25Z" />
            <text className="s03-banner-copy" x="214" y="66" textAnchor="middle">Malica, buka enam kejutan dulu ya!</text>
            <path className="s03-banner-tether" d="M340 60h288" />
            <path className="s03-plane" d="m665 60-74-25 26 25-26 25Z" />
          </svg>
        </div>
      )}
      {PAPER_EGGS.map((egg) => {
        const active = egg.id === activeId;
        const discovered = discoveredIds.includes(egg.id);
        return (
          <div key={egg.id} className={`s03-paper-egg s03-paper-egg--${egg.id}`} data-active={active || undefined} data-discovered={discovered || undefined}>
            <button
              type="button"
              className="s03-paper-egg-button"
              aria-label={egg.label}
              aria-pressed={active}
              onClick={() => activateEgg(egg.id)}
            >
              <PaperGlyph key={`${egg.id}-${active ? activationId : "idle"}`} id={egg.id} />
            </button>
            <span className="s03-paper-surprise" aria-live="polite">{active ? egg.surprise : ""}</span>
          </div>
        );
      })}
    </div>
  );
}
