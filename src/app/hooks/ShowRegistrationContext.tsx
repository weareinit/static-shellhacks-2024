"use client"
import React, { useContext, useState } from "react";

interface ShowRegistrationType {
  showRegistration: boolean;
  setShowRegistration: React.Dispatch<React.SetStateAction<boolean>>;
  finishedRegistration: boolean;
  setFinishedRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowRegistrationContext = React.createContext<ShowRegistrationType>({
  showRegistration: false,
  setShowRegistration: () => {},
  finishedRegistration: false,
  setFinishedRegistration: () => {},
});

export function useShowRegistrationContext() {
  return useContext(ShowRegistrationContext);
}

export function ShowRegistrationProvider({ children }: { children: React.ReactNode }) {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [finishedRegistration, setFinishedRegistration] = useState<boolean>(false);

  return (
    <ShowRegistrationContext.Provider
      value={{
        showRegistration,
        setShowRegistration,
        finishedRegistration,
        setFinishedRegistration,
      }}
    >
      {children}
    </ShowRegistrationContext.Provider>
  );
}