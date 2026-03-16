import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  items: [{
    id: Number,
    name: String,
    customName: String,
    basePrice: Number,
    price: Number,
    quantity: Number,
    selectedFruits: [String],
    specialInstructions: String
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['cash', 'online'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['New', 'Preparing', 'Ready', 'Completed', 'Edited', 'Cancelled'],
    default: 'New'
  },
  editHistory: [{
    editedAt: {
      type: Date,
      default: Date.now
    },
    previousItems: [{
      id: Number,
      name: String,
      customName: String,
      basePrice: Number,
      price: Number,
      quantity: Number,
      selectedFruits: [String],
      specialInstructions: String
    }],
    previousTotal: Number
  }],
  cancelReason: {
    type: String,
    default: null
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

export default mongoose.model('Order', orderSchema)
