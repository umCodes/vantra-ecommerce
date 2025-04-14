import { createContext, useEffect, useState } from "react"


export const ProductsContext = createContext();

const ProductsProvider = ({children}) => {        
        const [products, setProducts] = useState(null)
        
        useEffect(() =>{
            const fetchProducts = async () =>{
              try{
                  const response = await fetch('https://vantra-products-api.onrender.com/')
                  const data = await response.json()
                  setProducts(data);
        
                }catch(error){
                  console.error("error occured fetching products: ", error);
                  
              }
            }
        
            fetchProducts()
            
          }, [])


    return (
    <ProductsContext.Provider value={[products, setProducts]}>
        {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider