import { getAssetPath } from "@/app/util/getAssetPath";

interface LoadingSpinnerProps {
  size?: "large" | "small";
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps = { size: "large" }) {
  return <img src={getAssetPath("assets/new/misc/Shell_1.svg")} className={`animate-spin ${size == "large" ? "w-[50px]" : "w-5"}`} />;
}
