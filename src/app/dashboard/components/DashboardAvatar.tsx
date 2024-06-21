"use client";
import Image from "next/image";
import { CustomButton } from "./CustomButton";
import { dinosaurNames } from "@/app/constants/dinosaurNames";
import { useState } from "react";
import ChangeAvatarModal from "./ChangeAvatarModal";
import { Hacker_Applications } from "@prisma/client";

export default function DashboardAvatar({
  application,
}: {
  application: Hacker_Applications;
}) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const toggleAvatarModal = () => setIsAvatarModalOpen(!isAvatarModalOpen);

  const handleDinoChange = async (dino: number) => {
    toggleAvatarModal();

    await fetch(`/api/hackers/${application.id}`, {
      method: "PUT",
      body: JSON.stringify({ dinosaur_avatar: dino }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  };

  console.log(application.dinosaur_avatar);

  return (
    <>
      <Image
        src={`/assets/new/dinosaurs/${dinosaurNames[application.dinosaur_avatar]}.svg`}
        alt="Dinosaur Avatar"
        width={225}
        height={200}
        draggable={false}
      />
      <CustomButton onClick={toggleAvatarModal}>Change Avatar</CustomButton>

      {/* Modal to change the users avatar */}
      <ChangeAvatarModal
        isOpen={isAvatarModalOpen}
        toggleOpen={toggleAvatarModal}
        handleDinoChange={handleDinoChange}
      />
    </>
  );
}
