import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search cryptocurrencies..."
        onChange={(e) => onSearch(e.target.value)}
        className="lg:w-[400px]"
      />
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
