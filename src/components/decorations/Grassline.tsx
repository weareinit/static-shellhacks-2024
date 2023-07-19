import React from "react";

function GrassLine() {
  return (
    <div className="col-span-1 hidden md:block min-h-screen col-end-[-1] row-start-1 row-end-3 justify-self-end">
      <div className="bg-grass-tile bg-tile w-tile bg-right bg-repeat-y h-full relative right-0">
        <div className="bg-grass bg-tile w-tile bg-right relative bg-repeat-y h-full top-0 right-5" />
      </div>
    </div>
  );
}
export default GrassLine;
