import React from "react";
import Image from "next/image";

interface ProductImageProps {
  imgSource: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imgSource, alt }) => (
  <div className="relative w-full h-48 mb-4">
    <Image
      src={imgSource}
      alt={alt}
      fill
      style={{ objectFit: "contain" }}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="rounded-t-lg"
      priority
    />
  </div>
);

export default ProductImage;
