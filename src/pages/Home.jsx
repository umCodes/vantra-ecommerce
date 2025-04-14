import { Link } from "react-router"
import keyvisual from "../assets/key-visual.png"
import brands from "../assets/brands.png"


function Home() {

    return (
    <div>
        

        <div className="min-h-[90vh] grid min-md:grid-cols-[5fr_3fr] items-center gap-3 p-8 max-md:grid-rows-[1fr_320px] max-md:pt-12">
            
            <div className="flex flex-col p-4 gap-8 max-md:te-w-[300px]-center max-md:items-center">
                
                <div className="py-4">
                    <img src={brands} className="w-[50%] min-w-[280px]" />
                </div>
                
                <h1 className="text-5xl font-bold max-md:text-4xl">
                    Elevate Your Presence
                </h1>
                
                <p className="max-w-90 text-sm p-2 ">
                    Embrace the art of fashion with Vantra’s curated collections—crafted to captivate and inspire.
                    Every piece is a testament to style and refinement.
                </p>
                
                
                <Link to="/products" className="border w-fit p-4 m-2 transition-all duration-400 hover:bg-black hover:text-white">
                    Explore the Collection →
                </Link>
            </div>

            <div className="-z-10">
                <img src={keyvisual} alt="keyvisual" />
            </div>  




        </div>

    </div>
    )
}

export default Home