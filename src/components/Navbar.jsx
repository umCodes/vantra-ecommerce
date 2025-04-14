import { Link, useLocation } from "react-router"
import CartBtn from "./CartBtn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressBook, faBagShopping, faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"
import logo from '../assets/vantra-logo.png'





const Navbar = ({useShowNav}) => {
  const location = useLocation();
  const ulStyle = "flex flex-col gap-6 font-semibold text-xl";
  const [showNav] = useShowNav;

  const navBtns = (path) => clsx(
    'flex justify-center items-center aspect-square m-0.5 rounded',
    {'bg-black text-white': path === location.pathname},

  )

  return (
    <div className={`max-md:absolute ${showNav ? 'max-md:w-[80px]' : 'max-md:w-[0px]'} transition-all duration-200 min-md:h-[100vh] top-0 right-0 overflow-hidden bg-white z-1000 shadow-md flex flex-col items-center gap-5 py-2`}>
      <div>
        <img src={logo} alt="" />
      </div>

        <nav className="h-full flex flex-col w-full justify-between">
            <ul className={ulStyle}>
                <Link className={navBtns("/")} to="/"><FontAwesomeIcon icon={faHome}/></Link>
                <Link className={navBtns("/products")} to="/products"><FontAwesomeIcon icon={faBagShopping}/></Link>
                <Link className={navBtns("/cart")} to="/cart"><CartBtn /></Link>
            </ul>

            <ul className={ulStyle}>
              <Link className={navBtns("/contactus")} to="/contactus"><FontAwesomeIcon icon={faAddressBook}/></Link>
              <Link className={navBtns("/userprofile")} to="/userprofile"><FontAwesomeIcon icon={faUserCircle}/></Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar