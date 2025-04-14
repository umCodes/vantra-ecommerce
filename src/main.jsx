import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router.jsx'
import ProductsProvider from './context/ProductsProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import CartProvider from './context/CartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>        
        <ProductsProvider>
          <CartProvider>
              <RouterProvider router={router}/>        
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
  </StrictMode>,)
