import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const Home = () => {
  const getISTTime = () => {
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    return new Date(utc + (3600000 * 5.5))
  }
  const istTime = getISTTime()
  const hours = istTime.getHours()
  const mins = istTime.getMinutes()
  const timeInMins = hours * 60 + mins
  const startMins = 20 * 60 + 30 // 8:30 PM
  const endMins = 7 * 60 // 7:00 AM

  const isRestricted = timeInMins >= startMins || timeInMins < endMins

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AnimatePresence>
        {isRestricted && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="max-w-7xl mx-auto px-4 md:px-8 mt-8 mb-4"
          >
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-custom shadow-soft flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800 text-lg">Delivery Notice</h3>
                <p className="text-amber-900 mt-1 font-medium">
                  Delivery is not available in the girl's hostel after 8:30 PM.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Menu />
      <Footer />
      <Cart />
    </div>
  )
}

export default Home
