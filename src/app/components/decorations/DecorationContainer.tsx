import React, { ReactElement } from "react";

function DecorationContainer({ children }: { children: ReactElement[] | ReactElement }) {
  return <div className="hidden md:grid grid-cols-24 grid-rows-24 h-screen w-full">{children}</div>;
}

export default DecorationContainer;
