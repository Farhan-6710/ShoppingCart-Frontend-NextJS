// components/AccountDropdown.tsx
"use client";

import React, { useRef } from "react";
import { CircleUser, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>; // Renamed ref
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  isOpen,
  onToggle,
  dropdownRef, // Updated prop name
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onToggle(); // Close the dropdown after navigation
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {" "}
      {/* Updated prop usage */}
      <button
        className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-2 py-1 pr-0 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-all duration-300 ease-in-out dark:text-gray-200"
        onClick={onToggle}
      >
        <CircleUser
          className="text-primary dark:text-primaryLight mr-1"
          size={20}
          strokeWidth={1.5}
        />
        Account <ChevronDown className="ml-1 p-1" />
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg transition-all duration-200 ease-in-out z-20">
          <li>
            <button
              onClick={() => handleNavigation("/signup")}
              className="block w-full px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-700 transition-all duration-200 ease-in-out text-md text-left"
            >
              Sign Up
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/login")}
              className="block w-full px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out text-md text-left"
            >
              Login
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountDropdown;
