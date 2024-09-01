"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../dashboard/components/CustomButton";
import { useZxing } from "react-zxing";
import EventsSelection from "../../checkin/components/EventsSelection";

const CheckIn = () => {
  const [result, setResult] = useState("");
  const [currentSelection, setCurrentSelection] = useState<string>("Check In");
  const [currentUser, setCurrentUser] = useState<unknown>();

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div className="flex flex-col gap-5 px-4">
      <EventsSelection currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
      <div className=" flex w-full flex-col items-center justify-center">
        <video ref={ref} />
        <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckIn;
