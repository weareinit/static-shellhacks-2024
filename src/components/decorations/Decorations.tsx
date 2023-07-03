import React from "react";

import { BeachChairPropsType, BeachColors } from "./BeachChair";
import { TreeSide } from "./PalmTree";
import DecorationContainer from "./DecorationContainer";
import BeachChair from "./BeachChair";
import SmallRocks from "./SmallRocks";
import LifeHouse from "./LifeHouse";
import SandCastle from "./SandCastle";
import PalmTree from "./PalmTree";

function generateBeachChairs(): BeachChairPropsType[] {
  let beaches = [];
  for (let row = 3; row < 24; row += 3) {
    beaches.push({ color: BeachColors.red, column: 21, row, className: "hidden lg:block" });
  }
  for (let row = 5; row < 21; row += 3) {
    beaches.push({ color: BeachColors.red, column: 23, row });
  }

  beaches[3].color = BeachColors.green;
  beaches[5].color = BeachColors.blue;
  beaches[10].color = BeachColors.yellow;
  beaches[8].color = BeachColors.blue;

  return beaches;
}

function Decorations() {
  return (
    <DecorationContainer>
      <>
        {generateBeachChairs().map((element, index) => {
          return <BeachChair {...element} key={index} />;
        })}
      </>
      <SmallRocks column={2} row={2} />
      <SmallRocks column={5} row={20} />
      <BeachChair color={BeachColors.green} column={1} row={7} />
      <BeachChair color={BeachColors.blue} column={5} row={9} />
      <BeachChair color={BeachColors.blue} column={2} row={4} />
      <BeachChair color={BeachColors.yellow} column={3} row={12} />
      <BeachChair color={BeachColors.green} column={1} row={15} />
      <BeachChair color={BeachColors.blue} column={3} row={18} />
      <BeachChair color={BeachColors.red} column={2} row={22} />
      <LifeHouse className=" w-44 h-48 col-start-4 row-start-1" />
      <SandCastle className="col-start-1 row-start-[19] w-8 h-8" />
      <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 row-start-[12] col-start-3" />
      <PalmTree treeSide={TreeSide.left} className=" w-36 h-48 col-start-[18] row-start-[18] col-span-2" />
      {/* <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 col-start-[18] row-start-[9] col-span-2" /> */}
      <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 col-start-[18] row-start-[0] col-span-2" />
    </DecorationContainer>
  );
}

export default Decorations;
