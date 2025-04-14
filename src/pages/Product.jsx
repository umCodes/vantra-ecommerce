import { Link, useNavigate, useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faStar } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { ProductsContext } from "../context/ProductsProvider"
import { colornames } from 'color-name-list';
import { addToSubCollection } from "../firebase"
import { AuthContext } from "../context/AuthProvider"
import { CartContext } from "../context/CartProvider"



const Product = () => {
    const { productId } = useParams()
    const [products] = useContext(ProductsContext)
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('') 
    const {currentUser} = useContext(AuthContext)
    const {forceRender} = useContext(CartContext);

    const navigateTo = useNavigate();

    if(products){

        const product = products.find(product => product.id === Number(productId))
        if(!color) setColor(product.colorOptions[0])

        const handleAddToCart = () =>{
            if(currentUser) addToSubCollection(currentUser.uid, 'cart', {item: product, title: product.title, total: product.price * quantity ,quantity, color})
            else navigateTo("/register");
            forceRender(prev => prev + 1); // to update banner simultaneously
        }   
    
        const handleInc = () => setQuantity(prev => prev + 1)
        const handleDec = () => {
            if(quantity > 1 ) setQuantity(prev => prev - 1)
          }
        return (
            <>


                {/* path */}
                <span className="flex items-center gap-2 p-4 text-gray-800 text-sm max-md:flex-col max-md:items-start max-md:text-xs">
                    <Link to={"/products"} className="underline" >Products</Link>
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCaretRight}/>
                        <p className="cursor-default capitalize">{product.category.main}</p>     
                    </span>
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCaretRight}/>
                        <p className="cursor-default capitalize">{product.category.sub}</p>     
                    </span>
                    <span className="flex items-center gap-2">                    
                        <FontAwesomeIcon icon={faCaretRight}/>
                        <p className="cursor-default">{product.title}</p>
                    </span>
                </span>
    
    
                <div className="grid grid-cols-1 min-md:grid-cols-[2fr_4fr] gap-4 p-4 my-auto ">
                    

                    {/* image */}
                    <div className="bg-gray-100 rounded-md aspect-square flex items-end justify-center">
                        <img className="w-[80%] " src={`http://vantra-products-api.onrender.com${product.image}`} alt="product-image" />
                    </div>


                    {/*description*/}
                    <div className=" flex flex-col">
                        <div className=" my-auto">
                            <h6 className="text-gray-700 text-sm capitalize">{product.category.main}</h6>    
                            <h1 className="text-3xl font-bold max-md:text-2xl">{product.title}</h1>
                            <p className="text-gray-700 py-4 ">{product.description}</p>
                            {product.rating && <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-amber-300"/> {product.rating.rate} ({product.rating.count})</span>}
                        
                        </div>
                        


                        {/*Colors*/}
                        <div className="flex py-4">
                            {product.colorOptions.map((opt,i) =>{
                            const c = colornames.find(color => color.name === opt);
                
                            return <div
                                key={i} 
                                style={{backgroundColor: c.hex}}
                                className={`w-8 m-1 aspect-square border rounded-full ${color === c.name ? 'border-3 border-blue-400' :'border-gray-400'}`}
                                onClick={() => setColor(c.name)}
                                />
                            })}
                        </div>
                        
                        {/*Quantity*/}
                        <div className="flex w-fit items-center gap-2">
                            <p className="font-semibold">Quantity: </p>                        
                            <div className="flex items-center rounded-lg overflow-hidden gap-2 w-fit bg-gray-600">
                                <button
                                    onClick={handleDec} 
                                    className="w-fit p-1.5 hover:bg-gray-400 text-white">-</button>
                                <p className="text-white">{quantity}</p>
                                <button 
                                    onClick={handleInc} 
                                    className="w-fit p-1.5 hover:bg-gray-400 text-white">+</button>
                            </div>
                        </div>
                        
                        
                        {/* Price and Add to Basket */}
                        <div className="flex items-start max-sm:flex-col gap-4 my-8">
                            <p className="font-bold text-2xl py-4 text-green-900">${product.price}</p>
                                <button onClick={handleAddToCart} className="w-fit bg-black text-white py-2 px-4 my-2 rounded cursor-pointer">Add to Basket </button>
                        </div>
                    </div>
                </div>
            </>)
    } 
        
        
  
}

export default Product