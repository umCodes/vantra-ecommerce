import { Navigate, Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import { useContext, useState } from 'react'
import { AuthContext } from './context/AuthProvider'
import { CartContext } from './context/CartProvider'

function App() {

  const [showNav, setShowNav] = useState(false)
  

  return (
    <>
      <div className='grid min-md:grid-cols-[60px_auto]'>
        <Navbar useShowNav={[showNav, setShowNav]}/>
        <div className='h-[100vh] overflow-scroll'>           
          <div className='flex flex-col h-[100vh] overflow-scroll'>
            <Header useShowNav={[showNav, setShowNav]}/>
            <Outlet/>

          </div>
          <Footer />
        </div>

      </div>
    </>
  )
}

export default App

export const UnAuthRoute = () => {
    const {currentUser} = useContext(AuthContext);

    return currentUser ? <Navigate to="/products" replace/> : <Outlet/>
}

export const CheckOutRoute = () => {
    const {cartItems} = useContext(CartContext);
    
    return cartItems.length > 0 ?  <Outlet/> : <Navigate to="/cart" replace/>
}
