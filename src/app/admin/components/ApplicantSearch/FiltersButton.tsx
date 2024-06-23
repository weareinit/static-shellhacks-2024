interface FiltersButtonProps {
  handleClicked: () => void;
}

export default function FiltersButton({ handleClicked }: FiltersButtonProps) {
  return (
    <button
      className="rounded-lg bg-[#E9DBCC] p-2 font-museo text-black hover:bg-[#E9DBCC]/90"
      id="filtersBtn"
      onClick={handleClicked}
    >
      Filters
    </button>
  );
}
