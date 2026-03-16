import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Cart from '../components/Cart'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Menu />
      <Footer />
      <Cart />
    </div>
  )
}

export default Home
