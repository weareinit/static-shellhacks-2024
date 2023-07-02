import Image from "next/image";

interface FillImageProps {
  src: string;
  alt: string;
  objectFit?: string;
  className?: string;
}

function FillImage(props: FillImageProps) {
  return (
    <div className={`relative ${props.className}`}>
      <Image src={props.src} alt={props.alt} fill style={{ objectFit: "cover" }} />
    </div>
  );
}

export default FillImage;
