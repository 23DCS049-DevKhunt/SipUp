import express from 'express'
import Settings from '../models/Settings.js'

const router = express.Router()

// Get global settings (initialize if not exists)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ id: 'global_settings' })
    
    if (!settings) {
      settings = await Settings.create({ id: 'global_settings', isOrderingEnabled: true })
    }
    
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Toggle ordering status
router.patch('/toggle-ordering', async (req, res) => {
  try {
    let settings = await Settings.findOne({ id: 'global_settings' })
    
    if (!settings) {
      settings = await Settings.create({ id: 'global_settings', isOrderingEnabled: true })
    }

    settings.isOrderingEnabled = !settings.isOrderingEnabled
    const updatedSettings = await settings.save()
    
    res.json(updatedSettings)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
