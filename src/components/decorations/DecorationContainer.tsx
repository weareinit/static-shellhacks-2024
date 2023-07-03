import React, { ReactElement } from "react";

function DecorationContainer({ children }: { children: ReactElement[] }) {
  return <div className="hidden md:grid grid-cols-24 grid-rows-24 col-span-10 row-start-1 col-start-2 h-screen">{children}</div>;
}

export default DecorationContainer;
