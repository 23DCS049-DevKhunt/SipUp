import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { X, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState, useEffect, useRef } from 'react'
import { saveOrder } from '../utils/orders'
import { api } from '../utils/api'
import confetti from 'canvas-confetti'

const Cart = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotal, getItemCount, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', paymentMode: 'cash' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true)
  const cartControls = useAnimation()
  const prevLen = useRef(cart.length)

  // Fetch settings when cart opens to ensure we have the latest status
  useEffect(() => {
    if (isCartOpen) {
      const fetchSettings = async () => {
        try {
          const settings = await api.getSettings()
          if (settings) {
            setIsOrderingEnabled(settings.isOrderingEnabled)
          }
        } catch (error) {
          console.error("Failed to fetch order settings:", error)
        }
      }
      fetchSettings()
    }
  }, [isCartOpen])

  useEffect(() => {
    if (cart.length > prevLen.current) {
      cartControls.start({
        scale: [1, 1.3, 0.9, 1.15, 1],
        rotate: [0, -10, 10, -5, 0],
        transition: { duration: 0.5 }
      })
    }
    prevLen.current = cart.length
  }, [cart.length, cartControls])

  const handleCheckout = async (e) => {
    e.preventDefault()

    if (!isOrderingEnabled) {
      alert('Order service is currently disabled. We are not accepting new orders at this moment.')
      return
    }

    if (!formData.name || !formData.phone || formData.phone.length !== 10 || !formData.address.trim()) {
      alert('Please fill all fields correctly. Phone must be 10 digits and address is required.')
      return
    }

    setIsSubmitting(true)

    try {
      const order = {
        customerName: formData.name,
        phone: `+91${formData.phone}`,
        address: formData.address,
        items: cart,
        total: getTotal(),
        paymentMode: formData.paymentMode
      }

      const orderId = await saveOrder(order)

      // Save phone for order tracking
      localStorage.setItem('sipup_customer_phone', `+91${formData.phone}`)

      // Confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      alert(`Order Placed Successfully!\n\nTrack your order at: My Orders page`)
      clearCart()
      setIsCheckoutOpen(false)
      setIsCartOpen(false)
      setFormData({ name: '', phone: '', address: '', paymentMode: 'cash' })
    } catch (error) {
      if (error.status === 429) {
        alert(error.message || 'You have placed the maximum orders allowed per hour.')
      } else {
        alert(error.message || 'Failed to place order. Please try again.')
      }
      console.error('Order error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Cart Icon Button */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 text-white p-8 rounded-full"
        style={{
          background: getItemCount() > 0
            ? 'linear-gradient(135deg, #FF6B6B 0%, #ee5a24 100%)'
            : '#FF6B6B',
          boxShadow: getItemCount() > 0
            ? '0 0 20px rgba(255,107,107,0.5), 0 6px 20px rgba(255,107,107,0.3)'
            : '0 4px 15px rgba(0,0,0,0.15)',
        }}
        animate={cartControls}
        whileHover={{ scale: 1.15, boxShadow: '0 0 28px rgba(255,107,107,0.6)' }}
        whileTap={{ scale: 0.88 }}
      >
        {getItemCount() > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div className="relative">
          <ShoppingCart className="w-7 h-7" />
          <AnimatePresence>
            {getItemCount() > 0 && (
              <motion.span
                key={getItemCount()}
                className="absolute -top-3 -right-3 bg-accent text-text text-xs font-extrabold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {getItemCount()}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold font-heading text-text">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center text-text/60 py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 rounded-custom p-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-text">{item.customName || item.name}</h3>
                            {item.specialInstructions && (
                              <p className="text-sm text-text/60 mt-1">{item.specialInstructions}</p>
                            )}
                            {item.selectedFruits && item.selectedFruits.length > 0 && (
                              <p className="text-sm text-text/60 mt-1">
                                Fruits: {item.selectedFruits.join(', ')}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  <div className="flex justify-between text-xl font-bold text-text">
                    <span>Total:</span>
                    <span className="text-primary">₹{getTotal()}</span>
                  </div>
                  
                  {!isOrderingEnabled && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-custom text-sm font-semibold text-center">
                      Order service is temporarily offline. We are not accepting new orders right now.
                    </div>
                  )}

                  {!isCheckoutOpen ? (
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      disabled={!isOrderingEnabled}
                      className={`w-full py-3 rounded-custom font-semibold transition-colors shadow-soft ${isOrderingEnabled ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      {isOrderingEnabled ? 'Checkout' : 'Checkout Disabled'}
                    </button>
                  ) : (
                    <motion.form
                      onSubmit={handleCheckout}
                      className="space-y-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-custom focus:border-primary focus:outline-none"
                        required
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-text font-semibold">+91</span>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          className="flex-1 p-3 border-2 border-gray-200 rounded-custom focus:border-primary focus:outline-none"
                          maxLength="10"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Delivery Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-custom focus:border-primary focus:outline-none resize-none"
                        rows="3"
                        required
                      />
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="cash"
                            checked={formData.paymentMode === 'cash'}
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span className="text-text">Cash</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMode"
                            value="online"
                            checked={formData.paymentMode === 'online'}
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span className="text-text">Online</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsCheckoutOpen(false)}
                          className="flex-1 py-3 border-2 border-gray-300 rounded-custom font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-3 bg-primary text-white rounded-custom font-semibold hover:bg-primary/90 transition-colors shadow-soft disabled:opacity-50"
                        >
                          {isSubmitting ? 'Placing...' : 'Place Order'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Cart
