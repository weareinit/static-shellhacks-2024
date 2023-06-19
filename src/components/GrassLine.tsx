import React from "react";

function GrassLine() {
  return (
    <section className="col-span-1 hidden md:block h-screen">
      <div className="bg-grass-tile bg-right bg-repeat-y h-full relative right-0">
        <div className="bg-grass bg-right relative bg-repeat-y h-full top-0 right-5" />
      </div>
    </section>
  );
}
export default GrassLine;
