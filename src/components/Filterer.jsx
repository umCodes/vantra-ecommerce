import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Filterer = ({ list, title, state }) => {
  const [show, setShow] = useState(false);
  const [stateValue, setStateValue] = state;

  return (
    <div>

    
      <div className="" onClick={() => setShow(prev => !prev)}>
        
        <h2 className='flex items-center justify-between text-gray-500 font-semibold p-4 border-b border-b-gray-200'>
          <p >{title}</p>
          <FontAwesomeIcon icon={faCaretDown} />
        </h2>
    
        
            <ul className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${ show ? "max-h-100" : "max-h-0"}`}  >
                {list &&
                list.map((item, i) => (
                    <li
                        onClick={e => setStateValue(e.target.getAttribute("data-value"))} 
                        data-value={item} 
                        className={`px-4 py-2 mx-2 mr-16 rounded-md capitalize hover:shadow cursor-pointer ${stateValue === item && "bg-black text-white"}`}   
                        key={i}
                    >
                    {item}
                    </li>
                ))}
            </ul>
        
      </div>
    </div>
  );
};

export default Filterer;
