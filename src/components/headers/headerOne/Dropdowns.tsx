"use client";

import React, { useState, useRef, useEffect } from "react";
import AccountDropdown from "./AccountDropdown"; // Adjust the import path
import CurrencyDropdown from "./CurrencyDropdown"; // Adjust the import path

const Dropdowns: React.FC = () => {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isCurrencyOpen, setCurrencyOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      accountRef.current &&
      !accountRef.current.contains(event.target as Node)
    ) {
      setAccountOpen(false);
    }
    if (
      currencyRef.current &&
      !currencyRef.current.contains(event.target as Node)
    ) {
      setCurrencyOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex space-x-4 pr-3">
      <AccountDropdown
        isOpen={isAccountOpen}
        onToggle={() => setAccountOpen(!isAccountOpen)}
        dropdownRef={accountRef}
      />
      <CurrencyDropdown
        isOpen={isCurrencyOpen}
        onToggle={() => setCurrencyOpen(!isCurrencyOpen)}
        dropdownRef={currencyRef}
      />
    </div>
  );
};

export default Dropdowns;
