import { useContext } from "react";
import { Link } from "react-router"
import { AuthContext } from "../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply, faNavicon } from "@fortawesome/free-solid-svg-icons";




const Header = ({useShowNav}) => {
  const btnStyle = 'p-2 border m-1 cursor-pointer';
  const {currentUser} = useContext(AuthContext)
  const [showNav, setShowNav] = useShowNav;

  const handleShowNav = () => setShowNav(!showNav)
  return (
    <div className="flex items-center justify-between">
        <span
          onClick={handleShowNav} 
          className="min-md:hidden p-4 text-2xl">
          {showNav ?<FontAwesomeIcon icon={faMultiply}/>:<FontAwesomeIcon icon={faNavicon}/>}
        </span>
        <h1 className="text-xl font-bold p-4">Vantra</h1>

        {
          !currentUser &&
          <div>
          <Link 
            className={btnStyle}
            to="/login"
          >Log In</Link>
          
          <Link
            to="/register" 
            className={btnStyle + ' bg-black text-white hover:bg-gray-900'}>Register</Link>

        </div>
        }

    </div>
  )
}

export default Header