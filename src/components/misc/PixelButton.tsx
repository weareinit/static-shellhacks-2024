import LoadingSpinner from "./LoadingSpinner";

interface PixelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
  title?: string;
  className?: string;
}

export default function PixelButton({ onClick, disabled, isLoading, title, text, className }: PixelButtonProps) {
  return (
    <button title={title} className={`font-pixel text-md text-white flex justify-center py-2 px-4 rounded ${className}`} onClick={onClick} disabled={disabled || isLoading}>
      {isLoading ? <LoadingSpinner size="small" /> : text}
    </button>
  );
}
