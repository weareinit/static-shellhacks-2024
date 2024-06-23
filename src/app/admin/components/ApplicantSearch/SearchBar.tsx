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
      className="h-10 flex-grow rounded-lg border border-black bg-[#E9DBCC] p-3 font-museo focus:ring-2 sm:max-w-[250px]"
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
      onSubmit={onSearch}
    />
  );
}
