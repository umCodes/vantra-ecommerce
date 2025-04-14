import { useContext, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { colornames } from "color-name-list";
import { CartContext } from "../context/CartProvider";
import { Link } from "react-router";

function Cart() {
  const {_, forceRender, cartItems, handleDelete} = useContext(CartContext)

  useEffect(()=>{
    forceRender(prev => prev + 1)
  }, [])

  if(cartItems.length <= 0) return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-2xl font-bold text-slate-500">
        Your basket is empty
      </h1>
    </div>
  )

  const total = cartItems.reduce((acc, p) => acc + p.total, 0)
  
  return(
    <div className="flex flex-col bg-slate-50 h-full">

      {/* Cart Items */}
      <div className="flex-1  p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Basket</h1>
          <p className="text-sm text-slate-500 mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your basket</p>
        </div>

        <div className="space-y-4 mb-8">
          {cartItems.map(product => 
            <CartItem 
              key={product.docId} 
              product={product.item}
              quantity={product.quantity}
              total={product.total}
              color={product.color}
              docId={product.docId}
              handleDelete={handleDelete}
            />
          )}
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between py-2 text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-slate-600">
            <span>Discount</span>
            <span className="font-medium">$0.00</span>
          </div>
          <div className="flex justify-between py-2 text-slate-800 font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/*Price Details */}
      <div className="p-6 bg-white shadow-md border-t border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">Total: <span className="text-emerald-600">${total.toFixed(2)}</span></h2>
          <Link to="/checkout" className="bg-gray-950 cursor-pointer text-white py-3 px-6  font-medium transition-colors max-sm:whitespace-nowrap">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

const CartItem = ({product, color, quantity, total, docId, handleDelete}) => {
  return(
    <div className="bg-white border border-gray-400 overflow-hidden flex">
      
      {/* Image */}
      <div className="bg-slate-100 p-4 flex items-center justify-center w-32">
        <img 
          src={`http://vantra-products-api.onrender.com${product.image}`} 
          alt={product.title} 
          className="max-w-full max-h-24 object-contain"
        />
      </div>

      {/* Details */}

      <div className="flex-1 p-4 flex max-sm:flex-col max-sm:items-start justify-between items-center">
        <div className="mr-4">        
          <h2 className="font-semibold text-slate-800  max-sm:text-sm">{product.title}</h2>
          <p className="text-sm text-slate-500 mt-1">Quantity: {quantity}</p>

          <div className="flex items-center mt-2">
            <span className="text-xs text-slate-500 mr-2">Color:</span>
            <div
              style={{backgroundColor: colornames.find(c => c.name === color).hex}}
              className="w-5 h-5 rounded-full border border-slate-200" 
            /> 
          </div>          
        </div>
        

        <div className="text-right">
          <p className="text-emerald-600 font-bold">${total.toFixed(2)}</p>
        </div>
      </div>
    

      {/* Delete */}

      <div className="flex items-center justify-center p-4 bg-slate-50">
        <button 
          onClick={() => handleDelete(docId)}
          className="text-slate-400 hover:text-red-500 transition-colors p-2"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default Cart