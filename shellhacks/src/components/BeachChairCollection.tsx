import React from "react";

import BeachChair from "./BeachChair";

export default function BeachChairSection() {
  return (
    <>
      <BeachChair color="blue" x={200} y={100} />
      <BeachChair color="green" x={30} y={140} />
      <BeachChair color="red" x={0} y={400} />
      <BeachChair color="yellow" x={300} y={500} />
    </>
  );
}
