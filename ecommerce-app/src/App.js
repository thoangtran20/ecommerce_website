import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Homepage from './pages/homepage/Homepage'
import { ROUTERS } from './constants'
import Shop from './pages/shop/Shop'
import CustomerLayout from './layouts/customer-layout/CustomerLayout'
import Cart from './pages/cart/Cart'
import NotFound from './pages/notfound/NotFound'
import ProductDetail from './pages/productDetail/ProductDetail'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import { ToastContainer } from 'react-toastify'
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute'
import Admin from './pages/admin/Admin'
import Checkout from './pages/checkout/Checkout'
import WishList from './pages/wishList/WishList'
import CheckoutDetail from './pages/checkout/CheckoutDetail'
import CheckoutSuccess from './pages/checkout/CheckoutSuccess'
import OrderHistory from './pages/orderHistory/OrderHistory'
import OrderDetail from './pages/orderDetail/OrderDetail'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path={ROUTERS.home}
            element={<CustomerLayout content={<Homepage />} />}
          />
          <Route
            path={ROUTERS.shop}
            element={<CustomerLayout content={<Shop />} />}
          />
          <Route
            path={ROUTERS.productDetail}
            element={<CustomerLayout content={<ProductDetail />} />}
          />
          <Route
            path={ROUTERS.cart}
            element={<CustomerLayout content={<Cart />} />}
          />
          <Route
            path={ROUTERS.wishList}
            element={<CustomerLayout content={<WishList />} />}
          />
          <Route
            path={ROUTERS.checkout}
            element={<CustomerLayout content={<Checkout />} />}
          />
          <Route
            path={ROUTERS.checkoutDetails}
            element={<CustomerLayout content={<CheckoutDetail />} />}
          />
          <Route
            path={ROUTERS.checkoutSuccess}
            element={<CustomerLayout content={<CheckoutSuccess />} />}
          />
          <Route
            path={ROUTERS.orderHistory}
            element={<CustomerLayout content={<OrderHistory />} />}
          />
          <Route
            path={ROUTERS.orderDetail}
            element={<CustomerLayout content={<OrderDetail />} />}
          />
          <Route
            path={ROUTERS.login}
            element={<CustomerLayout content={<Login />} />}
          />
          <Route
            path={ROUTERS.register}
            element={<CustomerLayout content={<Register />} />}
          />
          <Route
            path={ROUTERS.reset}
            element={<CustomerLayout content={<Reset />} />}
          />
          <Route
            path={ROUTERS.admin}
            element={
              // <Admin />
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          {/* <Route
            path={ROUTERS.admin}
            element={<AdminLayout />}
            content={<Admin />}
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
