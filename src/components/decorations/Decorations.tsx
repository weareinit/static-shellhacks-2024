import React from "react";

import { BeachChairPropsType, BeachColors } from "./BeachChair";
import DecorationContainer from "./DecorationContainer";
import BeachChair from "./BeachChair";
import SmallRocks from "./SmallRocks";

function generateBeachChairs(): BeachChairPropsType[] {
  let beaches = [];
  for (let row = 2; row < 24; row += 3) {
    beaches.push({ color: BeachColors.red, column: 21, row });
  }
  for (let row = 3; row < 24; row += 3) {
    beaches.push({ color: BeachColors.red, column: 23, row });
  }
  return beaches;
}

function Decorations() {
  return (
    <DecorationContainer>
      <>
        {generateBeachChairs().map((element, index) => {
          return <BeachChair color={element.color} row={element.row} column={element.column} key={index} />;
        })}
      </>
      <SmallRocks column={2} row={2} />
      <SmallRocks column={5} row={20} />
      <BeachChair color={BeachColors.green} column={1} row={6} />
      <BeachChair color={BeachColors.blue} column={5} row={9} />
      <BeachChair color={BeachColors.blue} column={3} row={4} />
      <BeachChair color={BeachColors.yellow} column={3} row={12} />
      <BeachChair color={BeachColors.green} column={3} row={15} />
      <BeachChair color={BeachColors.blue} column={6} row={18} />
      <BeachChair color={BeachColors.red} column={2} row={20} />
    </DecorationContainer>
  );
}

export default Decorations;
