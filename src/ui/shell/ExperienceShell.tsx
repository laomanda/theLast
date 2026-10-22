"use client";

import { useExperienceStore } from "../../state/experience-store";
import { S01Prelude } from "../s01/S01Prelude";
import { S02Invitation } from "../s02/S02Invitation";
import { S03BirthdayReveal } from "../s03/S03BirthdayReveal";
import { S04Portrait } from "../s04/S04Portrait";
import { S05CakeStudio } from "../s05/S05CakeStudio";
import { S06MakeAWish } from "../s06/S06MakeAWish";
import { S07BirthdayLetter } from "../s07/S07BirthdayLetter";
import { S08FinalBirthdayMoment } from "../s08/S08FinalBirthdayMoment";
import { S09HiddenDiscovery } from "../s09/S09HiddenDiscovery";
import { S10Vault } from "../s10/S10Vault";
import { S11PhysicalLetter } from "../s11/S11PhysicalLetter";
import { S12FinalLetter } from "../s12/S12FinalLetter";
import { TheaterCurtainTransition } from "./TheaterCurtainTransition";

function RuntimeBoundary({ scene }: { scene: string }) {
  return (
    <section
      data-testid="runtime-boundary"
      aria-label="Runtime integration boundary"
      className="flex min-h-[100dvh] w-full items-center justify-center bg-[#F6F1E8] p-6 text-center text-[#2C282A]"
    >
      <p className="max-w-md text-sm leading-relaxed">
        The runtime reached {scene}. Its visual renderer is not included in this checkpoint.
      </p>
    </section>
  );
}

export type ScenePresentation = "s01" | "s02" | "s03" | "s04" | "s05" | "s06" | "s07" | "s08" | "s09" | "s10" | "s11" | "s12" | "runtime-boundary";

export function scenePresentationKind(scene: string): ScenePresentation {
  if (scene === "S01") return "s01";
  if (scene === "S02") return "s02";
  if (scene === "S03") return "s03";
  if (scene === "S04") return "s04";
  if (scene === "S05") return "s05";
  if (scene === "S06") return "s06";
  if (scene === "S07") return "s07";
  if (scene === "S08") return "s08";
  if (scene === "S09") return "s09";
  if (scene === "S10") return "s10";
  if (scene === "S11") return "s11";
  if (scene === "S12") return "s12";
  return "runtime-boundary";
}

export function ExperienceShell() {
  const scene = useExperienceStore((state) => state.scene);
  let presentation;
  switch (scenePresentationKind(scene)) {
    case "s01":
      presentation = <S01Prelude />; break;
    case "s02":
      presentation = <S02Invitation />; break;
    case "s03":
      presentation = <S03BirthdayReveal />; break;
    case "s04":
      presentation = <S04Portrait />; break;
    case "s05":
      presentation = <S05CakeStudio />; break;
    case "s06":
      presentation = <S06MakeAWish />; break;
    case "s07":
      presentation = <S07BirthdayLetter />; break;
    case "s08":
      presentation = <S08FinalBirthdayMoment />; break;
    case "s09":
      presentation = <S09HiddenDiscovery />; break;
    case "s10":
      presentation = <S10Vault />; break;
    case "s11":
      presentation = <S11PhysicalLetter />; break;
    case "s12":
      presentation = <S12FinalLetter />; break;
    default:
      // No unimplemented or unexpected scene may masquerade as a production renderer.
      presentation = <RuntimeBoundary scene={scene} />;
  }
  return <>{presentation}<TheaterCurtainTransition /></>;
}

