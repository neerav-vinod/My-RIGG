
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './routes/AdminRoute';
import AdminDashBoard from './pages/Admin/AdminDashBoard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import UsersList from './pages/Admin/UsersList';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductPage from './pages/ProductPage';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/'element={<HomePage/>} />
        <Route path='/search' element={<Search/>} /> 
        <Route path='/cart' element={<CartPage/>} /> 
        <Route path='/product-details/:id' element={<ProductDetails/>} />
        <Route path='/dashboard' element={<PrivateRoute/>}> 
        <Route path='user' element={<Dashboard/>} />
        <Route path='user/profile' element={<Profile/>} />
        <Route path='user/orders' element={<Orders/>} /> 
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashBoard/>} />
        <Route path='admin/create-category' element={<CreateCategory/>} />
        <Route path='admin/create-product' element={<CreateProduct/>} />
        <Route path='admin/products' element={<Product/>} />
        <Route path='admin/users-list' element={<UsersList/>} />
        <Route path='admin/edit-product/:id' element={<UpdateProduct/>} />
        </Route>
        <Route path='/register'element={<Register/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/login'element={<Login/>} />
        <Route path='/products' element={<ProductPage/>} />
      </Routes> 
    </div>
  );
}

export default App;
