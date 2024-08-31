// components/SearchBar.tsx
import React from "react";
import { Search } from "lucide-react";
import { useId } from "react";

// Define the Product interface
interface Product {
  id: number;
  productName: string;
  imgSource?: string;
  productPrice?: number;
  rating?: number;
}

interface SearchBarProps {
  searchTerm: string;
  placeholder: string;
  isIndexPage: boolean;
  showDropdown: boolean;
  filteredProducts: Product[];
  highlightedIndex: number | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onSearchClickForHome: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSelectProduct: (productName: string) => void;
  onShowAllProductsClick: () => void;
  dropdownRef: React.RefObject<HTMLUListElement>;
  searchRef: React.RefObject<HTMLDivElement>;
  searchContainerRef: React.RefObject<HTMLDivElement>;
  previousSearches: string[];
  addPreviousSearch: (productName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  placeholder,
  isIndexPage,
  showDropdown,
  filteredProducts,
  highlightedIndex,
  onSearchChange,
  onSearchClick,
  onSearchClickForHome,
  onKeyDown,
  onSelectProduct,
  onShowAllProductsClick,
  dropdownRef,
  searchRef,
  searchContainerRef,
  previousSearches,
  addPreviousSearch,
}) => {
  const id = useId(); // Correct usage

  return (
    <div
      ref={searchRef}
      className="relative hidden md:flex justify-center md:w-6/12 mb-4 md:mb-0 pl-0 lg:pl-10 xl:pl-6"
    >
      <div
        ref={searchContainerRef}
        className="relative flex items-center lg:w-full"
      >
        <input
          id={`search-bar-${id}`} // Unique ID for each instance
          type="text"
          placeholder={placeholder}
          className="relative z-10 border border-gray-300 dark:border-gray-500 py-2 px-4 w-full h-10 font-bold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 dark:focus:ring-gray-600" // Apply dark mode styles
          value={searchTerm}
          onChange={onSearchChange}
          onClick={(e) => {
            e.stopPropagation();
            if (!isIndexPage) {
              onSearchClick();
            } else {
              onSearchClickForHome();
            }
          }}
          onKeyDown={onKeyDown}
          autoComplete="off" // Disable browser autocomplete
        />

        <div
          className="relative w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-500 p-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (!isIndexPage) {
              onSearchClick();
            } else {
              onSearchClickForHome();
            }
          }}
        >
          <Search className="text-gray-500 dark:text-gray-300 text-sm" />
        </div>
      </div>

      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute top-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 max-h-60 overflow-y-auto shadow-lg z-20 text-primary"
          style={{ minWidth: searchContainerRef.current?.offsetWidth }}
        >
          {searchTerm === "" && !isIndexPage && (
            <li
              className="cursor-pointer p-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-primary dark:text-gray-100"
              onClick={onShowAllProductsClick}
            >
              Show All Products
            </li>
          )}
          {searchTerm !== "" && filteredProducts.length === 0 ? (
            <li className="cursor-default p-2 px-4 text-gray-500 dark:text-gray-400">
              No Results
            </li>
          ) : (
            filteredProducts.map((product, index) => (
              <li
                key={product.id}
                className={`cursor-pointer p-2 px-4 flex justify-between ${
                  index === highlightedIndex
                    ? "bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                }`}
                onClick={() => {
                  onSelectProduct(product.productName);
                  addPreviousSearch(product.productName); // Add to previous searches
                }}
              >
                <span>{product.productName}</span>
              </li>
            ))
          )}

          {!isIndexPage && previousSearches.length > 0 && (
            <>
              {previousSearches.map((search, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 px-4 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  <span>{search}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Search History
                  </span>{" "}
                  {/* Display previous search in smaller size */}
                </li>
              ))}
            </>
          )}
          {!isIndexPage && searchTerm !== "" && (
            <li
              className="cursor-pointer p-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-primary dark:text-gray-100"
              onClick={onShowAllProductsClick}
            >
              Show All Products
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
