# Quick Start Guide - SipUp Website

## ✅ Current Status

- ✅ Backend server running on `http://localhost:5000`
- ✅ MongoDB connected successfully
- ✅ Menu items seeded (25 items)
- ✅ Frontend server running on `http://localhost:3000`

## 🚀 Access the Website

**Frontend:** http://localhost:3000
**Backend API:** http://localhost:5000/api
**Admin Dashboard:** http://localhost:3000/admin

## 📋 Admin Login

- **Username:** `admin`
- **Password:** `sipup123`

## 🗄️ MongoDB Connection

- **Database:** `sipup`
- **Connection:** `mongodb+srv://dev:dev@sipup.vyu5hra.mongodb.net/sipup`
- **Collections:** `orders`, `menuitems`

## 🔄 To Restart Everything

### Stop Current Servers
Press `Ctrl+C` in both terminal windows

### Start Backend Server
```bash
cd server
npm run dev
```

### Start Frontend Server (in new terminal)
```bash
npm run dev
```

## ✅ Verify Everything Works

1. **Check Backend:** Visit http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"SipUp API is running"}`

2. **Check Menu:** Visit http://localhost:5000/api/menu
   - Should return array of 25 menu items

3. **Check Frontend:** Visit http://localhost:3000
   - Should see the SipUp homepage with animated fruits

4. **Test Order Flow:**
   - Add items to cart
   - Click checkout
   - Fill in name and phone
   - Place order
   - Order should be saved to MongoDB

5. **Check Admin Dashboard:**
   - Visit http://localhost:3000/admin
   - Login with admin credentials
   - Should see orders and sales data

## 🐛 Troubleshooting

### Backend not starting?
- Check if port 5000 is already in use
- Verify MongoDB connection string is correct
- Check `server/node_modules` exists

### Frontend not loading menu?
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify menu was seeded (visit /api/menu/seed)

### Orders not saving?
- Check MongoDB connection
- Verify backend server is running
- Check browser console for API errors

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/menu` - Get all menu items
- `GET /api/menu/juices-shakes` - Get juices and shakes
- `GET /api/menu/plates` - Get fruit plates
- `POST /api/menu/seed` - Seed menu (one-time)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/active` - Get active orders
- `GET /api/orders/completed` - Get completed orders
- `PATCH /api/orders/:id` - Update order status
- `GET /api/orders/sales/today` - Today's sales
- `GET /api/orders/sales/week` - Week's sales

---

**Everything is ready to go! 🎉**
