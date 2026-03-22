import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import MyOrders from './pages/MyOrders'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <ScrollToTop />
    </CartProvider>
  )
}

export default App
