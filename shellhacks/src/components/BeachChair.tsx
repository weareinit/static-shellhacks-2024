import React from "react";

interface BeachCharPropsType {
  color: "blue" | "red" | "yellow" | "green";
}

function BeachChair({ color }: BeachCharPropsType) {
  return <div></div>;
}

export default BeachChair;
