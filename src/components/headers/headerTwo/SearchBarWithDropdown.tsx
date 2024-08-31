// components/SearchBarWithDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./SearchBar"; // Import the new component

interface Product {
  id: number;
  productName: string;
  imgSource?: string;
  productPrice?: number;
  rating?: number;
}

interface SearchBarWithDropdownProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onSearchSelect: (productName: string) => void;
  productsData: Product[];
}

const SearchBarWithDropdown: React.FC<SearchBarWithDropdownProps> = ({
  searchTerm,
  setSearchTerm,
  filteredProducts,
  setFilteredProducts,
  showDropdown,
  setShowDropdown,
  onSearchSelect,
  productsData,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const dropdownRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]); // For storing previous searches
  const [placeholder, setPlaceholder] = useState("Search..."); // Default placeholder

  const isIndexPage = pathname === "/"; // Check if on index page

  // Handle search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredProducts([]);
      setShowDropdown(true); // Keep dropdown open when search term is cleared
    } else {
      const results = productsData.filter((product) =>
        product.productName.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredProducts(results);
      setShowDropdown(true);
    }
    setHighlightedIndex(null);
  };

  // Handle search input click
  const handleSearchClick = () => {
    if (searchTerm === "" || !isIndexPage) {
      setShowDropdown(true);
    }
    setPlaceholder("Type Something To Search"); // Update placeholder text
  };

  const handleSearchClickForHome = () => {
    setPlaceholder("Type Something To Search"); // Update placeholder text
  };

  // Handle product selection
  const handleSelectProduct = (productName: string) => {
    setSearchTerm(""); // Clear the search input
    setShowDropdown(false);
    router.push(`/products/${productName}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null
          ? 0
          : Math.min(filteredProducts.length - 1, (prevIndex ?? -1) + 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null
          ? filteredProducts.length - 1
          : Math.max(0, (prevIndex ?? 1) - 1),
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      e.preventDefault();
      const product = filteredProducts[highlightedIndex];
      handleSelectProduct(product.productName);
    }
  };

  // Handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, setShowDropdown]);

  // Handle adding previous searches
  const addPreviousSearch = (productName: string) => {
    setPreviousSearches((prev) => {
      if (prev.includes(productName)) return prev;
      return [productName, ...prev].slice(0, 5); // Limit to last 5 searches
    });
  };

  const handleShowAllProductsClick = () => {
    router.push("/");
    setShowDropdown(false);
  };

  return (
    <SearchBar
      searchTerm={searchTerm}
      placeholder={placeholder}
      isIndexPage={isIndexPage}
      showDropdown={showDropdown}
      filteredProducts={filteredProducts}
      highlightedIndex={highlightedIndex}
      onSearchChange={handleSearchChange}
      onSearchClick={handleSearchClick}
      onSearchClickForHome={handleSearchClickForHome}
      onKeyDown={handleKeyDown}
      onSelectProduct={handleSelectProduct}
      onShowAllProductsClick={handleShowAllProductsClick}
      dropdownRef={dropdownRef}
      searchRef={searchRef}
      searchContainerRef={searchContainerRef}
      previousSearches={previousSearches}
      addPreviousSearch={addPreviousSearch}
    />
  );
};

export default SearchBarWithDropdown;
