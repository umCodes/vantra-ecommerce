import {  faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { colornames } from 'color-name-list';
import { Link, useNavigate } from "react-router";

const ProductCard = ({ item }) => {
  const navigate = useNavigate(); 
  
  return (
    <div className="grid grid-rows-[180px_auto] border border-gray-400 bg-gray-100 rounded">
    
      {/* Image */}
      <div className="relative flex items-end justify-center">
       

        {/* pic btn */}
        <img 
          className=" h-full"
          src={`http://vantra-products-api.onrender.com${item.image}`} 
          alt="product-image" 
        />

        {/* colors */}
        <div className="absolute right-0 top-0">
          {item.colorOptions.map(opt => {
            const color = colornames.find(color => color.name === opt).hex;

            return <div 
              key={opt}
              className="p-2.5 rounded-full m-2 border border-gray-500"
              style={{ backgroundColor: color }}
              />
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between " >
        <header className="p-2">
          <div className="text-right">
            <FontAwesomeIcon 
              icon={faStar}
              className="text-amber-400"
            />
            {item.rating.rate} ({item.rating.count})
          </div> 
          <h3 className="font-semibold text-xl">{item.title}</h3>
        </header>

        <div className="flex flex-col"> 
          <p className="p-2 ml-auto w-fit text-green-900">${item.price}</p>

          <Link
            className="mt-auto border text-center p-2 m-1 bg-black text-white"
            onClick={() => navigate(`/products/product/${item.id}`)}
          >
            View Details →
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default ProductCard
