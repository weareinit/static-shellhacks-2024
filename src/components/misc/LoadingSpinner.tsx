interface LoadingSpinnerProps {
  size?: "large" | "small";
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps = { size: "large" }) {
  return <img src="/assets/decorations/shell.svg" className={`animate-spin ${size == "large" ? "w-24" : "w-5"}`} />;
}
