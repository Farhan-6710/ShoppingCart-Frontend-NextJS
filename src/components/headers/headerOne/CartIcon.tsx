import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartIconProps {
  cartCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ cartCount }) => (
  <Link href="/cart">
    <div className="block md:hidden relative mt-1">
      <ShoppingCart
        className="text-primary dark:text-gray-200 transition-all duration-200"
        size={24}
        strokeWidth={2.5}
      />
      {cartCount > 0 && (
        <span className="absolute top-0 -right-6 flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-medium rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2">
          {cartCount}
        </span>
      )}
    </div>
  </Link>
);

export default CartIcon;
