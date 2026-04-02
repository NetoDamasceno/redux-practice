import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../data/products";

import ProductItem from "../product-item";
import SkeletonCard from "../skeleton-card";

import * as Styles from "./styles";

const Products = () => {
  const [loading, setLoading] = useState(true);

  // 🔍 pega o termo de busca do Redux
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 🔍 filtra os produtos
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Styles.Container>
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        // ❌ estado vazio elegante
        <div className="w-full flex flex-col items-center justify-center py-16 text-gray-700">
          <p className="text-xl font-semibold mb-2">
            Nenhum produto encontrado
          </p>
          <p className="text-sm text-gray-500">
            Tente buscar por outro nome ou palavra-chave
          </p>
        </div>
      )}
    </Styles.Container>
  );
};

export default Products;
