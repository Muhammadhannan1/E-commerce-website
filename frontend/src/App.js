import React,{useEffect,useState} from 'react'
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from './component/User/ResetPassword'
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from 'axios';
import Payment from "./component/Cart/Payment"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from './component/Admin/Dashboard';
import ProductList from "./component/Admin/ProductList"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from "./component/Admin/OrderList"
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from "./component/Admin/UsersList"
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews"
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
function App() {


  const {isAuthenticated,user} = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey(){

    const {data}= await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

useEffect(() => {
WebFont.load({
  google:{
    families:["Roboto","Droid sans","Chilanka"]
  }
})

store.dispatch(loadUser())

getStripeApiKey()

  },[])
  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route exact path = "/" element={<Home/>}/>
      <Route exact path = "/product/:id" element={<ProductDetails/>}/>
      <Route exact path = "/products" element={<Products/>}/>
      <Route path = "/products/:keyword" element={<Products/>}/>
      <Route exact path = "/search" element={<Search/>}/>
    <Route exact path = "/account" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route exact path = "/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
    <Route exact path = "/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
    <Route exact path = "/password/forgot" element={<ForgotPassword/>}/>
    <Route exact path = "/password/reset/:token" element={<ResetPassword/>}/>
    <Route exact path = "/Cart" element={<Cart/>}/>
    <Route exact path = "/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
    <Route exact path = "/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
    
    {stripeApiKey && <Route exact path = "/process/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>
</ProtectedRoute>}/>}

<Route exact path = "/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
<Route exact path = "/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
<Route exact path = "/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>

<Route  exact path = "/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
<Route  exact path = "/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>}/>
<Route  exact path = "/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
<Route  exact path = "/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
<Route  exact path = "/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
<Route  exact path = "/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>}/>

<Route  exact path = "/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>}/>
<Route  exact path = "/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
<Route  exact path = "/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews/></ProtectedRoute>}/>

    <Route exact path='/contact' element={<Contact/>}/>
    <Route exact path='/about' element={<About/>}/>
      <Route exact path = "/login" element={<LoginSignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
