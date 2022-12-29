import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Homepage from './pages/homepage/Homepage'
import { ROUTERS } from './constants'
import Shop from './pages/shop/Shop'
import CustomerLayout from './layouts/customer-layout/CustomerLayout'
import Cart from './pages/cart/Cart'
import NotFound from './pages/notfound/NotFound'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
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
            path={ROUTERS.cart}
            element={<CustomerLayout content={<Cart />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
