import { createContext, useEffect, useState } from "react"


export const ProductsContext = createContext();

const ProductsProvider = ({children}) => {        
        const [products, setProducts] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        
        useEffect(() =>{
            const fetchProducts = async () =>{
              try{
                  setIsLoading(true)
                  const response = await fetch('https://vantra-products-api.onrender.com/')
                  const data = await response.json()
                  setProducts(data);
                setIsLoading(false)
                }catch(error){
                  console.error("error occured fetching products: ", error);
                  setIsLoading(false)
              }
            }
        
            fetchProducts()
            
          }, [])


    return (
    <ProductsContext.Provider value={[products, setProducts, isLoading]}>
        {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider