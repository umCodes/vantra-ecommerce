import { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../context/ProductsProvider";

function ProductsList({ products }) {
  const [ isLoading ] = useContext(ProductsContext); // Get products from context


    if(isLoading){
        return (<div className='h-full flex items-center justify-center' >
              <span>loading products...</span>  
            </div>)
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