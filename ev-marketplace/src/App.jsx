import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/common/Navbar.jsx'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Compare from './pages/Compare.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Showrooms from './pages/Showrooms.jsx'
import TestRide from './pages/TestRide.jsx'
import Finance from './pages/Finance.jsx'
import Account from './pages/Account.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'

// Pages that don't need the Navbar (auth pages)
const AUTH_ROUTES = ['/login', '/signup']

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isAuth = AUTH_ROUTES.includes(pathname)
  return (
    <>
      {!isAuth && <Navbar />}
      <main className={!isAuth ? 'pt-[76px]' : ''}>{children}</main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scooters" element={<Listing />} />
          <Route path="/scooters/:id" element={<ProductDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/showrooms" element={<Showrooms />} />
          <Route path="/test-ride" element={<TestRide />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
