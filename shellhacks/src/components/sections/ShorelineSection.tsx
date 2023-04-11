import React from "react"

function ShorelineSection() {
  return (
    <section className="col-span-3 order-last md:order-first ">
      <div className="grid grid-cols-1 md:grid-cols-4 w-100 h-full">
        <div className="col-span-3 bg-water bg-repeat-round" />
        <div className="col-span-1 order-first md:order-last bg-shore-line bg-repeat-round" />
      </div>
    </section>
  )
}

export default ShorelineSection
