import { useEffect, useState } from "react";
import products from "../../data/products";

import ProductItem from "../product-item";
import SkeletonCard from "../skeleton-card";

import * as Styles from "./styles";

const Products = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Styles.Container>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
    </Styles.Container>
  );
};

export default Products;
