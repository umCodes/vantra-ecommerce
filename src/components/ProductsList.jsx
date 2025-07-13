import { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../context/ProductsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductsList({ products }) {
  const [_, _, isLoading] = useContext(ProductsContext); // [products, setProducts, isLoading]

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-2xl text-gray-500">
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
        Loading products...
      </div>
    );
  }

  return (
    <div className="px-8 py-4 overflow-y-scroll max-h-[80vh]">
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2">
        {products && products.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;