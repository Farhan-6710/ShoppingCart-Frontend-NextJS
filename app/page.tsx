"use client";

import React, { useState } from "react";
import ProductCard from "@/src/components/sections/cardsSection/ProductCard";
import productsData from "@/public/products.json";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { RootState } from "@/src/store"; // Import RootState
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCurrency,
} from "@/src/features/cart/cartSlice"; // Import actions and selectors
import { Product } from "@/types/product";
import { CartItem } from "@/types/cartItems";

const transformProductsData = (data: any[]): Product[] => {
  return data.map((product) => ({
    id: Number(product.id),
    productName: product.productName,
    imgSource: product.imgSource,
    prices: {
      USD: product.prices.USD,
      INR: product.prices.INR,
    },
    rating: product.rating || 0,
  }));
};

const Page: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    transformProductsData(productsData)
  );
  const [fadeClass, setFadeClass] = useState("");
  const router = useRouter();

  const dispatch = useDispatch(); // Initialize the dispatch function
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Get cart items from Redux state
  const currency = useSelector((state: RootState) => state.cart.currency); // Get currency from Redux state

  const handleSearchSelect = (productName: string) => {
    if (productName === "Show All Products") {
      setFilteredProducts(transformProductsData(productsData));
    } else {
      setFadeClass("fade-out");
      setTimeout(() => {
        setFilteredProducts(
          transformProductsData(productsData).filter(
            (product) => product.productName === productName
          )
        );
        setFadeClass("fade-in");
        router.push(`/products/${encodeURIComponent(productName)}`);
      }, 300);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      currency,
    };
    if (!cartItems.some((item) => item.id === product.id)) {
      dispatch(addToCart(cartItem));
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="bg-gray-100 dark:bg-primaryDark transition-colors duration-200">
      <div className="container mx-auto px-4 pt-6 pb-4">
        <div
          className={`flex flex-wrap -mx-4 product-card-wrapper pb-10 ${fadeClass}`}
        >
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                productName={product.productName}
                imgSource={product.imgSource}
                prices={product.prices}
                rating={product.rating}
                addToCart={() => handleAddToCart(product)}
                removeFromCart={() => handleRemoveFromCart(product.id)}
                isInCart={cartItems.some((item) => item.id === product.id)}
                currency={currency}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default Page;
