import { faFilter, faMultiply, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filterer from "./Filterer";

const Aside = ({useCatg, usePrice, useRating, useGender, useBrand, useShowAside}) => {
    const [showAside, setShowAside] = useShowAside;
    const [currCatg, setCurrCatg] = useCatg; 
    const [currRating, setCurrRating] = useRating;
    const [currPrice, setCurrPrice] = usePrice;
    const gender = ["All", "Men's", "Women's"];
    const categories = ["All", "Tops", "Bottoms", "Accessories"]
    const brands = ["All", "Aurora", "Vantra", "Mocka"]



    return (
    <aside 
        className={`overflow-scroll my-auto transition-all duration-200 max-md:absolute max-md:h-[100vh] max-md:shadow-lg ${showAside ? 'max-md:w-[60%]': 'max-md:w-0' } bg-white max-md:z-1000 top-0 left-0`}
    >
        <div className="flex items-center justify-between p-4 text-2xl">
            <h1 className="font-bold"><FontAwesomeIcon icon={faFilter}/> Filter</h1>
            <button
                className="cursor-pointer min-md:hidden"
                onClick={() => setShowAside(false)}
            >
                <FontAwesomeIcon icon={faMultiply}/>
            </button>
        </div>
        
        <div>
            <Filterer 
                title={"Gender"}
                list={gender}
                state={useGender}
            />
        </div>

        <div>
            
            <Filterer 
                title={"Brands"}
                list={brands}
                state={useBrand}
            />
        </div>

        <div>
            <h2 className='text-gray-500 font-semibold p-4'>Categories</h2>
            <div>
                <ul>
                {categories.map((catg, i) => (
                    <li 
                        key={i}
                        onClick={e => setCurrCatg(e.target.getAttribute("data-value"))} 
                        data-value={catg} 
                        className={`px-4 py-2 mx-2 mr-16 rounded-md capitalize hover:shadow cursor-pointer ${currCatg === catg && "bg-black text-white"}`}
                    >
                        {catg}
                    </li>
                ))}
                </ul>
            </div>
            
        </div>
        
        <div>
                <h2 className='text-gray-500 font-semibold p-4'>Rating</h2>
                <div className='flex items-center gap-2 px-4'>
                <span>0</span>
                <input 
                        type="range"
                        min="0"
                        max="5"
                        onChange={e => setCurrRating(e.target.value)}
                        value={currRating}

                />
                <span>{currRating} <FontAwesomeIcon icon={faStar}/></span>
            </div>
        </div>
        <div>            
            {/*Price Range*/}
            <h2 className='text-gray-500 font-semibold p-4'>Price Range</h2>
            <div className='flex items-center gap-2 px-4'>
                <span>0</span>
                <input 
                        type="range"
                        min="0"
                        max="1500"
                        onChange={e => setCurrPrice(e.target.value)}
                        value={currPrice}
                />
                <span>${currPrice}</span>
            </div>
        </div>
    </aside>
  )
}

export default Aside