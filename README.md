# SipUp - Fresh Fruits, Fresh Vibes 🍉🍊🍍

A modern, mobile-first restaurant ordering website for fresh fruit juices, shakes, and plates. Built with React, TailwindCSS, and Framer Motion for buttery-smooth animations.

## Features

- 🚀 **Lightning-fast ordering** - Complete checkout in under 30 seconds
- 📱 **Mobile-first design** - Optimized for all devices
- 🎨 **Vibrant UI** - Clean whites, fresh greens, and fruit-inspired colors
- 🛒 **Smart cart** - Real-time updates with persistent storage
- ⚡ **No login required** - Quick checkout for customers
- 👨‍💼 **Admin dashboard** - Manage orders and track sales
- ✨ **Smooth animations** - Framer Motion powered micro-interactions
- 📊 **Order management** - Track orders from New → Preparing → Ready → Completed

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **MongoDB** - Database (MongoDB Atlas)
- **Express.js** - Backend API server
- **Mongoose** - MongoDB ODM
- **PWA Ready** - Installable web app

## Getting Started

### Installation

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

### Development

1. **Start the backend server (in one terminal):**
```bash
npm run server
# or
cd server && npm run dev
```

2. **Start the frontend (in another terminal):**
```bash
npm run dev
```

3. **Seed the menu items (one-time, after starting server):**
Visit `http://localhost:5000/api/menu/seed` in your browser

Visit `http://localhost:3000` for the frontend

### Build

```bash
npm run build
```

### Admin Access

Navigate to `/admin` and login with:
- Username: `admin`
- Password: `sipup123`

## MongoDB Setup

The app uses MongoDB Atlas. See `MONGODB_SETUP.md` for detailed setup instructions.

**Connection String:** `mongodb+srv://dev:dev@sipup.vyu5hra.mongodb.net/sipup`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Hero.jsx     # Hero section with animated background
│   ├── Menu.jsx     # Menu grid with tabs
│   ├── Cart.jsx     # Shopping cart sidebar
│   ├── CustomizationModal.jsx  # Item customization
│   └── Footer.jsx   # Footer with contact info
├── pages/           # Page components
│   ├── Home.jsx     # Main landing page
│   └── Admin.jsx    # Admin dashboard
├── context/         # React context
│   └── CartContext.jsx  # Cart state management
└── utils/           # Utility functions
    ├── menuData.js  # Menu items data
    └── orders.js    # Order management functions
```

## Design System

- **Primary Color**: #FF6B6B (Watermelon)
- **Secondary Color**: #4ECDC4 (Mint)
- **Accent Color**: #FFE66D (Pineapple)
- **Background**: #F8F9FA
- **Text**: #2C3E50
- **Fonts**: Poppins (headings), Inter (body)
- **Border Radius**: 16px
- **Shadows**: Soft 0 4px 20px rgba(0,0,0,0.08)

## Features in Detail

### Customer Flow
1. Browse menu items in beautiful grid layout
2. Click "Add to Cart" to customize (select fruits, quantity, special instructions)
3. View cart from floating button
4. Quick checkout (name, phone, payment mode)
5. Confetti celebration on order success!

### Admin Flow
1. Login to admin dashboard
2. View active orders with status management
3. Update order status (New → Preparing → Ready → Completed)
4. Track sales (today/week)
5. View completed orders history

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

---

Made with ❤️ for fresh fruit lovers
