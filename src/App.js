import React, { useEffect } from 'react';

import './App.css';
import  {LoginPage}  from './pages/LoginPage';
import {SignupPage} from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './pages/Home';

import {AdminHome} from './pages/AdminHome';
import { CartPage } from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import  PageNotFound  from './pages/404';
import OrderSuccessPage  from './pages/OrderSuccessPage';
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import { ForgotPasswordPage } from './pages/ForgetPasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage ';
import ProductForm from './features/admin/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import ResetPassword from './features/auth/components/RenamePassword';

const router = createBrowserRouter([
 {
   path:"/",
   element:(<Protected> <Home/></Protected>)
 }, 
 {
  path:"/admin",
  element:( <AdminHome/>)
  // element:(<ProtectedAdmin> <AdminHome/></ProtectedAdmin>)
}, 
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path:"/signup",
    element:(<SignupPage/>)
  },
  {
    path:"/cart",
    element:(<Protected><CartPage/></Protected>)
  },
  {
    path:"/checkout",
    element:(<Protected><Checkout/> </Protected>)
  },
  {
    path:"/product-detail/:id",
    element:(<Protected><ProductDetailPage></ProductDetailPage></Protected>)
  },
  {
    path:"/admin/product-detail/:id",
    element:(
    // <ProtectedAdmin>
    <AdminProductDetailPage></AdminProductDetailPage>
    // {/* </ProtectedAdmin> */}
    )
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      // <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      // </ProtectedAdmin>
    ),
  },
  {
    path:'/order-success/:id',
    element:(<OrderSuccessPage/>)
  },
  {
    path:'/my-orders',
    element:(
      <UserOrdersPage></UserOrdersPage>
    )
  },
  {
    path:"/profile",
    element:(
      <UserProfilePage></UserProfilePage>
    )
  },
  {
    path:'/logout',
    element:(
      <Logout/>
    )
  },
  {
   path:'/forgot-password',
   element:(<ForgotPasswordPage/>)
  },{
   path:'/admin/product-form',
   element:(
   <AdminProductFormPage></AdminProductFormPage>
   )
  },
  // {
  //   path:'/admin/product-form/edit/:id',
  //   element:(
  //   <AdminProductFormPage></AdminProductFormPage>
  //   )
  //  },
   {
    path:'/admin/orders',
    element:(
      <AdminOrdersPage></AdminOrdersPage>
    )
   },
   {
     path:'/reset-password',
     element:(
      <ResetPassword></ResetPassword>
     )
   },
  {
    path:'*',
    element:(<PageNotFound/>)
  }
  
]);

function App() {
  const dispatch=useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
    }

  },[dispatch,user])
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
