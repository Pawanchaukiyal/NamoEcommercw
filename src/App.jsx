import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from "./pages/home/HomePage"
import NoPage from "./pages/noPage/NoPage"
import ProductInfo from './components/productinfo/ProductInfo';
import { ScrollTop } from './components/scrollTop/ScrollTop';
import CartPage from './pages/cart/CartPage';
import AllProduct from './pages/allProduct/AllProduct';
import SignUp from './pages/registration/SignUp';
import Login from './pages/registration/Login';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import MyState from "./context/myState";
import { Toaster } from 'react-hot-toast';
import ProtectedRouteForUser from './protectedRoute/ProtectedRouteForUser';
import ProtectedRouteForAdmin from './protectedRoute/ProtectedRouteForAdmin';
import CategoryPage from './pages/category/CategoryPage';

const App = () => {
  return (
    <MyState>
     <Router>
      <ScrollTop/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/*' element={<NoPage/>}/>
        <Route path='/productinfo/:id' element={<ProductInfo/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/allproduct' element={<AllProduct/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/category/:categoryname' element={<CategoryPage/>}/>


        <Route path='/user-dashboard' element={
          <ProtectedRouteForUser>
            <UserDashboard/>
          </ProtectedRouteForUser>
          }/>
        <Route path='/admin-dashboard' element={
          <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
        }/>
        <Route path='/addproduct' element={
          <ProtectedRouteForAdmin>
          <AddProduct/>
          </ProtectedRouteForAdmin>
          }/>
        <Route path='/updateproduct/:id' element={
          <ProtectedRouteForAdmin>
          <UpdateProduct/>
          </ProtectedRouteForAdmin>
          }/>      
      </Routes>
      <Toaster />    
     </Router>
     </MyState>
  )
}

export default App