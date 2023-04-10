import React from "react"

function ShorelineSection() {
  return (
    <section>
      <div className="absolute md:top-0 bottom:0 left-0 md:w-48 w-screen">
        <div className="bg-water md:h-screen w-screen md:w-36 min-h-[25vh] md:top-0 bottom-0" />
        <div className="bg-shore-line md:h-screen w-screen md:bg-repeat-y bg-repeat-x md:w-12 h-12 absolute right-0 top-0"></div>
      </div>
    </section>
  )
}

export default ShorelineSection
