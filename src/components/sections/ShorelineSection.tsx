import React from "react";

function ShorelineSection() {
  return (
    <section className="col-span-3 order-last md:order-first ">
      <div className="grid grid-cols-1 grid-rows-4 md:grid-rows-none md:grid-cols-4 w-100 h-full">
        <div className="col-span-3 h-full bg-water bg-repeat-round row-span-3 md:row-span-full" />
        <div className="col-span-1 order-first md:order-last bg-shore-line bg-repeat-round" />
      </div>
    </section>
  );
}

export default ShorelineSection;
