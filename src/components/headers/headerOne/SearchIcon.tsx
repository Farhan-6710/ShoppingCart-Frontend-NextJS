import React from "react";
import { Search } from "lucide-react";

const SearchIcon: React.FC = () => (
  <div className="block md:hidden relative mt-1">
    <Search className="text-primary" size={24} strokeWidth={2.5} />
  </div>
);

export default SearchIcon;
