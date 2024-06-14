interface SearchBarProps {
  onSearch: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchBar({
  onSearch,
  onChange,
  value,
}: SearchBarProps) {
  return (
    <input
      className="h-8 w-[250px] flex-shrink-0 rounded-lg border border-black bg-[#E9DBCC] p-3 font-museo focus:ring-2 sm:h-10"
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      onSubmit={onSearch}
    />
  );
}
