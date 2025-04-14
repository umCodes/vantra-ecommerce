import { createBrowserRouter } from "react-router";
import App, { CheckOutRoute, UnAuthRoute } from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";



export const router = createBrowserRouter([
    {path: '/', element: <App />,  children: [
        {path: "", element: <Home />},
        {
            element: <UnAuthRoute />,
            children:[
                {path: "register", element: <SignUp/>},
                {path: "login", element: <Login />}
            ]

        },
        {
            element: <CheckOutRoute />,
            children:[
                {path: "checkout", element: <Checkout/>},
            ]

        },
        {path: "products", element: <Products />},
        {path: "products/product/:productId", element: <Product />},
        {path: "cart", element: <Cart />},
        {path: "contactus", element: <Contact />},
        {path: "userprofile", element: <Profile />},
        
    ]}
])


