import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Input type="text" placeholder="Search cryptocurrencies..." />
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
