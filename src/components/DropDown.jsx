import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const DropDown = ({title, list, useSortBy}) => {
  const [height, setHeight] = useState(false);
  const [sortby, setSortBy] = useSortBy; 


  return (
    <div className="relative z-100">
        <div className=" w-fit border cursor-pointer bg-white" onClick={() => setHeight(prev => !prev)}>
            <h2 className="text-md flex py-2 px-2 items-center justify-between gap-2 ">
              <p className="whitespace-nowrap overflow-hidden max-md:max-w-29">{title} {sortby}</p><FontAwesomeIcon icon={faCaretDown}/>
            </h2>
          </div>

            <ul className={`${height  ? 'max-h-100 ' : 'max-h-0 p-0'} absolute top-[100%] whitespace-nowrap right-[30%] bg-white shadow w-fit  m-1.5 overflow-hidden transition-all duration-200 ease-in-out`}>
              {list && list.map((item, i) => 
                  <li 
                    onClick={() => {
                      setSortBy(item)
                      setHeight(false)
                    }} 
                    key={i} 
                    className={`py-2 px-4 hover:bg-gray-200 cursor-pointer ${sortby === item && "bg-gray-200"}`}
                  >{item}</li>)}  
            </ul>
    </div>
  )
}

export default DropDown