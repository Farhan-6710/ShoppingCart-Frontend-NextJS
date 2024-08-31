"use client";

import React from "react";
import AddressSection from "./AddressSection";
import Marquee from "./Marquee";
import Dropdowns from "./Dropdowns";
import CartIcon from "./CartIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store"; // Import RootState

const HeaderOne: React.FC = () => {
  // Get cart count and currency from Redux store
  const cartCount = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );
  const currency = useSelector((state: RootState) => state.cart.currency);

  return (
    <header className="bg-gray-100 dark:bg-primaryDark transition-colors duration-200">
      <div className="container mx-auto flex justify-center md:justify-between items-center p-4 md:p-2 pr-0 pl-1 space-x-0 md:space-x-8">
        <AddressSection />
        <Marquee />
        <Dropdowns /> {/* Dropdowns already uses currency from Redux */}
        <CartIcon cartCount={cartCount} />
      </div>
    </header>
  );
};

export default HeaderOne;
