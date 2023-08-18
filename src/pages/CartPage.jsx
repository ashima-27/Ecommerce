import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'
export const CartPage = () => {
  return (
    <div>
    <Navbar>
        <Cart/>
        </Navbar>
        <Footer/>
    </div>
  )
}
