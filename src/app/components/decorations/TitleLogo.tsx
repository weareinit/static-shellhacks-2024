import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";

const WIDE_SCREEN_LOGO_WIDTH_PERCENTAGE = 0.4;
const NARROW_SCREEN_LOGO_WIDTH_PERCENTAGE = 0.75;

export default function TitleLogo() {
  const titleReference = useRef<HTMLDivElement>();
  const windowWidth = useWindowWidth() ?? 0;
  const isWideScreen: boolean = windowWidth > 750;

  // We need an even round number as any decimals in height/width break the "flipbook" effectt
  const adjustedSpriteFrameWidth = isWideScreen
    ? evenOutOddNumber(
        Math.round(windowWidth * WIDE_SCREEN_LOGO_WIDTH_PERCENTAGE),
      )
    : evenOutOddNumber(
        Math.round(windowWidth * NARROW_SCREEN_LOGO_WIDTH_PERCENTAGE),
      );

  useEffect(() => {
    if (titleReference.current) {
      titleReference.current.style.setProperty(
        "--title-sprite-frame-end-position",
        `-${20 * adjustedSpriteFrameWidth}px`,
      );

      if (isMobile) {
        titleReference.current.classList.remove("title-sprite");
        setTimeout(() => {
          titleReference.current &&
            titleReference.current.classList.add("title-sprite");
        }, 25);
      }
    }
  }, [adjustedSpriteFrameWidth]);

  return (
    <div
      className="title-sprite"
      ref={(element) => {
        if (!element) return;
        titleReference.current = element;
      }}
      style={{ width: `${adjustedSpriteFrameWidth}px` }}
    />
  );
}

const evenOutOddNumber = (num: number) => (num % 2 == 0 ? num : num + 1);
