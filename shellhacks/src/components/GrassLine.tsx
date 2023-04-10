import React from "react"

function GrassLine() {
  return (
    <div className="relative">
      <div className="bg-grass-tile w-screen h-10" />
      <div className="bg-grass w-screen h-10 absolute top-3" />
      <div className="bg-grass w-screen h-10 absolute top-4 right-3" />
    </div>
  )
}
export default GrassLine
