import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { CartContext } from "../context/CartProvider"
import clsx from "clsx"

const CartBtn = () => {

  const {cartItems} = useContext(CartContext)


  const btnBannerStyle = clsx({'relative cart-count': cartItems.length > 0})
  return (
    <div
      data-count={cartItems.length} 
      className={btnBannerStyle}>

      <FontAwesomeIcon 
        icon={faCartShopping}
      />
    </div>
  )
}

export default CartBtn