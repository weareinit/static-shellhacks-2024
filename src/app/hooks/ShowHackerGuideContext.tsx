import React, { createContext, useContext, useState } from "react";

interface ShowHackerGuideContextType {
  showHackerGuide: boolean;
  setShowHackerGuide: React.Dispatch<React.SetStateAction<boolean>>;
}

const HackerGuideContext = createContext<ShowHackerGuideContextType>({
  showHackerGuide: false,
  setShowHackerGuide: () => {},
});

export function useHackerGuideContext() {
  return useContext(HackerGuideContext);
}

export function ShowHackerGuideProvider({ children }: { children: React.ReactNode }) {
  const [showHackerGuide, setShowHackerGuide] = useState<boolean>(false);
  return <HackerGuideContext.Provider value={{ showHackerGuide, setShowHackerGuide }}>{children}</HackerGuideContext.Provider>;
}
