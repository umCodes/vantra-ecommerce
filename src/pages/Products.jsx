import { useContext, useState } from "react"
import ProductsList from "../components/ProductsList"
import DropDown from "../components/DropDown"
import { ProductsContext } from "../context/ProductsProvider"
import Aside from "../components/Aside"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

function Products() {
    const [sortby, setSortBy] = useState("Default")    
    const [currCatg, setCurrCatg] = useState('All')
    const [currGender, setCurrGender] = useState('All')
    const [currBrand, setCurrBrand] = useState('All')
    const [currRating, setCurrRating] = useState(0)
    const [currPrice, setCurrPrice] = useState(1500)
    const [showAside, setShowAside] = useState(false);
    const [products] = useContext(ProductsContext)

    const sortTypes = {
        "Default": (a, b) => a.id - b.id,
        "Alphabetically (a-z)": (a, b) => a.title.localeCompare(b.title),
        "Alphabetically (z-a)": (a, b) => b.title.localeCompare(a.title),
        "Price (high to low)": (a, b) => b.price - a.price,
        "Price (low to high)": (a, b) => a.price - b.price,
      }

 
    
    if (products){ 
        
        const sortedProducts =    products
        .sort(sortTypes[sortby])
        .filter(product =>{
            const filters = {
                gender: currGender === 'All' ? '' : currGender,
                category: currCatg === 'All' ? '' : currCatg,
                brand: currBrand === 'All' ? '' : currBrand
            }
            
    
            const filterCondition = 
                (filters.gender === product.category.main || filters.gender === '') &&
                (filters.brand === product.brand || filters.brand === '') &&
                (filters.category === product.category.sub || filters.category === '') 
    
    
            
            return product.price <= currPrice && product.rating.rate >= currRating && filterCondition 
    
        });  
        
    
        
        
        
        return ( 
            <div className="grid grid-rows-[1fr_9fr] h-[100vh] hide-scroll-bar overflow-scroll">
            
                <div className="flex p-2 items-center justify-between px-8">
                    <p className="text-gray-500">{sortedProducts.length} products</p>

                    <div className="flex items-center gap-4">
                        <button 
                            className="min-md:hidden"
                            onClick={() => setShowAside(true)}>
                            <span><u>Filter</u></span> <FontAwesomeIcon  icon={faFilter}/> 
                        </button> 
                            <DropDown 
                        title="Sort: " 
                        list={["Default","Alphabetically (a-z)", "Alphabetically (z-a)", "Price (high to low)", "Price (low to high)"]}
                        useSortBy={[sortby, setSortBy]}
                        />
                    </div>
                    

                    </div>
                
            
                <div className="grid max-md:grid-cols-1 grid-cols-[280px_auto]">

                    <Aside   
                        useShowAside={[showAside, setShowAside]}     
                        useCatg={[currCatg, setCurrCatg]}
                        useRating={[currRating, setCurrRating]}
                        usePrice={[currPrice, setCurrPrice]}
                        useGender={[currGender, setCurrGender]}
                        useBrand={[currBrand, setCurrBrand]}
                    />

                    <ProductsList 
                        products={sortedProducts}/>
                </div>
            </div>
        )
    }
}

export default Products