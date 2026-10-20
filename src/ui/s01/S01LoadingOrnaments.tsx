"use client";

export function S01LoadingOrnaments() {
  return (
    <div className="s01-loading-ornaments" aria-hidden="true">
      <svg className="s01-orbit-art" viewBox="0 0 520 360" focusable="false">
        <path className="s01-orbit-coral" d="M36 210C112 62 302 26 470 120" />
        <path className="s01-orbit-lavender" d="M52 266C180 152 320 212 448 58" />
        <circle className="s01-orbit-dot s01-orbit-dot--coral" cx="94" cy="118" r="7" />
        <circle className="s01-orbit-dot s01-orbit-dot--apricot" cx="398" cy="92" r="9" />
        <circle className="s01-orbit-dot s01-orbit-dot--blue" cx="438" cy="226" r="6" />
      </svg>
      <div className="s01-paper-card s01-paper-card--coral"><span>J</span></div>
      <div className="s01-paper-card s01-paper-card--lavender"><span>M</span></div>
      <div className="s01-paper-card s01-paper-card--apricot"><span>19</span></div>
    </div>
  );
}
