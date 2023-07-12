import useWindowSize from "@/hooks/WindowSize";
import { useEffect, useRef } from "react";

const WIDE_SCREEN_LOGO_WIDTH_PERCENTAGE: number = 0.4;
const NARROW_SCREEN_LOGO_WIDTH_PERCENTAGE: number = 0.75;

export default function TitleLogo() {
  const titleReference = useRef<HTMLDivElement>();
  const { width: windowWidth = 1000 } = useWindowSize();
  const isWideScreen: boolean = windowWidth > 750;

  // We need an even round number as any decimals in height/width break the "flipbook" effectt
  const adjustedSpriteFrameWidth = isWideScreen
    ? evenOutOddNumber(Math.round(windowWidth * WIDE_SCREEN_LOGO_WIDTH_PERCENTAGE))
    : evenOutOddNumber(Math.round(windowWidth * NARROW_SCREEN_LOGO_WIDTH_PERCENTAGE));

  useEffect(() => {
    titleReference.current && titleReference.current.style.setProperty(
        "--title-sprite-frame-end-position", 
        `-${20 * adjustedSpriteFrameWidth}px`
    );
  });

  return (
    <div
      className="title-sprite"
      ref={(element) => {
        if (!element) return;
        titleReference.current = element;
      }}
      style={{ width: `${adjustedSpriteFrameWidth}px`, height: `${adjustedSpriteFrameWidth / 2}px` }}
    />
  );
}

const evenOutOddNumber = (num: number) => (num % 2 == 0 ? num : num + 1);
