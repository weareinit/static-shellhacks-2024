import React, { Dispatch, SetStateAction } from "react";

interface EventsSelectionProps {
  currentSelection: string;
  setCurrentSelection: Dispatch<SetStateAction<string>>;
  checkInOptions: Map<string, string[]>;
  setCheckInOptions: Dispatch<SetStateAction<Map<string, string[]>>>;
}
const EventsSelection: React.FC<EventsSelectionProps> = ({ currentSelection, setCurrentSelection, checkInOptions, setCheckInOptions }) => {
  return <div></div>;
};

export default EventsSelection;
