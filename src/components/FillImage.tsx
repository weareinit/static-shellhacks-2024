import Image from "next/image";

interface FillImageProps {
  src: string;
  alt: string;
  objectFit?: string;
}

function FillImage(props: FillImageProps) {
  return (
    <div className="relative w-40 h-40 rounded-pixel">
      <Image src={props.src} alt={props.alt} fill style={{ objectFit: "cover" }} />
    </div>
  );
}

export default FillImage;
