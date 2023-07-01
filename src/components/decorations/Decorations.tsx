import React, { ReactElement } from "react";

import BeachChair from "./BeachChair";
import SmallRocks from "./SmallRocks";

function Decorations() {
  function generateBeachChairs(): ReactElement[] {
    let beaches = [];
    for (let row = 2; row < 24; row += 3) {
      beaches.push(<BeachChair chairKey={`row=${row},col=${18}`} color="red" column={21} row={row} />);
    }
    for (let row = 3; row < 24; row += 3) {
      beaches.push(<BeachChair chairKey={`row=${row},col=${23}`} color="red" column={23} row={row} />);
    }
    return beaches;
  }
  return (
    <div className="hidden md:grid grid-cols-24 grid-rows-24 col-span-10 row-start-1 col-start-2 h-screen">
      {generateBeachChairs().map((element) => {
        return element;
      })}
      <SmallRocks column={2} row={2} />
      <SmallRocks column={5} row={20} />
      <BeachChair color="green" column={1} row={6} />
      <BeachChair color="blue" column={5} row={9} />
      <BeachChair color="blue" column={3} row={4} />
      <BeachChair color="yellow" column={3} row={12} />
      <BeachChair color="green" column={3} row={15} />
      <BeachChair color="blue" column={6} row={18} />
      <BeachChair color="red" column={2} row={20} />
    </div>
  );
}

export default Decorations;
