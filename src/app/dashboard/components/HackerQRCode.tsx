"use client";
import { QRCode } from "react-qrcode-logo";

interface HackerQRCode {
  hacker_id: string;
}

export default function HackerQRCode({ hacker_id }: HackerQRCode) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-museo text-xl">Your QR Code:</p>
      <p className="text-md font-museo">
        Scan this QR Code to check in at the event.
      </p>
      <QRCode
        value={hacker_id}
        logoImage="assets/new/misc/Shell_1.svg"
        logoOpacity={100}
        logoWidth={40}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}
