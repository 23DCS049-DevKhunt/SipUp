import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: 'global_settings'
  },
  isOrderingEnabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Settings', settingsSchema)
