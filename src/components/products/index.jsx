import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../data/products";

import ProductItem from "../product-item";
import SkeletonCard from "../skeleton-card";

import * as Styles from "./styles";

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const searchTerm = useSelector((state) => state.search.searchTerm);

  // ⏳ fake loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 debounce (suaviza busca)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 🔍 filtro com normalização
  const filteredProducts = products.filter((product) =>
    normalizeText(product.name).includes(normalizeText(debouncedSearch)),
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
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-700 animate-fadeIn">
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
