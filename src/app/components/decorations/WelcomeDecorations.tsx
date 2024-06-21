import React from "react";

import { BeachChairPropsType, BeachColors } from "./items/BeachChair";
import { TreeSide } from "./items/PalmTree";
import DecorationContainer from "./DecorationContainer";
import BeachChair from "./items/BeachChair";
import SmallRocks from "./items/SmallRocks";
import LifeHouse from "./items/LifeHouse";
import SandCastle from "./items/SandCastle";
import PalmTree from "./items/PalmTree";

function generateBeachChairs(): BeachChairPropsType[] {
  let beaches = [];
  for (let row = 3; row < 24; row += 6) {
    beaches.push({ color: BeachColors.red, column: 22, row });
  }
  for (let row = 5; row < 21; row += 6) {
    beaches.push({ color: BeachColors.red, column: 24, row, className: "hidden lg:block" });
  }

  beaches[0].color = BeachColors.yellow;
  beaches[3].color = BeachColors.green;
  beaches[5].color = BeachColors.blue;
  // beaches[10].color = BeachColors.yellow;
  // beaches[8].color = BeachColors.blue;

  return beaches;
}

function WelcomeDecorations() {
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
      <BeachChair color={BeachColors.blue} column={2} row={4} />
      <BeachChair color={BeachColors.yellow} column={3} row={12} />
      <BeachChair color={BeachColors.blue} column={3} row={18} />
      <BeachChair color={BeachColors.red} column={2} row={22} />
      <SandCastle className="col-start-1 row-start-[19] w-8 h-8" />
      <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 row-start-[6] col-start-3 hidden lg:block" />
      <PalmTree treeSide={TreeSide.left} className=" w-36 h-48 col-start-[18] row-start-[18] col-span-2 hidden lg:block" />
      {/* <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 col-start-[18] row-start-[9] col-span-2" /> */}
      <PalmTree treeSide={TreeSide.right} className=" w-36 h-48 col-start-[18] row-start-[0] col-span-2 hidden lg:block" />
    </DecorationContainer>
  );
}

export default WelcomeDecorations;
