import type { RefObject } from "react";
import { OffsetLoopOpen } from "../s01/OffsetLoopOpen";

export interface FoldedEditorialKeepsakeProps {
  rigRef: RefObject<HTMLDivElement | null>;
  leftFoldRef: RefObject<HTMLDivElement | null>;
  rightFoldRef: RefObject<HTMLDivElement | null>;
  innerRef: RefObject<HTMLDivElement | null>;
  motifRef: RefObject<HTMLDivElement | null>;
  shadowRef: RefObject<HTMLDivElement | null>;
  assetAvailable: boolean;
  onAssetError: () => void;
}

export function FoldedEditorialKeepsake({
  rigRef,
  leftFoldRef,
  rightFoldRef,
  innerRef,
  motifRef,
  shadowRef,
  assetAvailable,
  onAssetError,
}: FoldedEditorialKeepsakeProps) {
  return (
    <div className="s02-keepsake-stage" aria-hidden="true">
      <div ref={rigRef} className="s02-paper-rig" data-testid="s02-paper-rig">
        <div ref={innerRef} className="s02-paper-panel s02-paper-center">
          <div className="s02-paper-inner-line" />
          <span className="s02-paper-index">02 / KEEP</span>
        </div>

        <div ref={leftFoldRef} className="s02-paper-panel s02-paper-left" data-testid="s02-left-fold">
          <span className="s02-fold-rule" />
          <span className="s02-fold-number">02</span>
          <div ref={motifRef} className="s02-object-mark">
            <OffsetLoopOpen staticMode className="h-full w-full" />
          </div>
        </div>

        <div ref={rightFoldRef} className="s02-paper-panel s02-paper-right" data-testid="s02-right-fold">
          <span className="s02-fold-rule s02-fold-rule-right" />
          {assetAvailable && (
            // eslint-disable-next-line @next/next/no-img-element -- exact byte-preserved REV5 SVG asset.
            <img
              src="/assets/svg/paper/invitation-paper-fold.svg"
              alt=""
              className="s02-rev5-fold-accent"
              onError={onAssetError}
            />
          )}
        </div>

      </div>
      <div ref={shadowRef} className="s02-contact-shadow" />
    </div>
  );
}
