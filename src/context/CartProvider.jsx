import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider";
import { getSubCollection, removeFromSubCollection } from "../firebase";


export const CartContext = createContext();


const CartProvider = ({children}) => {

    const { currentUser } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([])
    const [_, forceRender] = useState(false)
    
    useEffect(() => {
    const getCartItems = async () => {
        if(currentUser){
          const data = await getSubCollection(currentUser.uid, 'cart')
          setCartItems(data);
      }
    }
    
    getCartItems();
    }, [_, currentUser])

    const handleDelete = (docId) => {
        removeFromSubCollection(currentUser.uid, 'cart', docId)
        forceRender(prev => prev + 1)
        
    }

  return (
    <CartContext.Provider value={{_, forceRender, cartItems, handleDelete}}>
        {children}

    </CartContext.Provider>
  )
}

export default CartProvider