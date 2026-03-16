# MongoDB Setup Guide

## Quick Start

1. **Install server dependencies:**
```bash
cd server
npm install
```

2. **Start the backend server:**
```bash
npm run dev
# or from root directory:
npm run server
```

The server will run on `http://localhost:5000`

3. **Seed the menu items (one-time setup):**
Visit `http://localhost:5000/api/menu/seed` in your browser or use:
```bash
curl -X POST http://localhost:5000/api/menu/seed
```

This will populate the database with all menu items.

4. **Start the frontend:**
```bash
npm run dev
```

## MongoDB Connection

The app is configured to use:
- **Connection String:** `mongodb+srv://dev:dev@sipup.vyu5hra.mongodb.net/sipup`
- **Database Name:** `sipup`

## API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/active` - Get active orders
- `GET /api/orders/completed` - Get completed orders
- `PATCH /api/orders/:id` - Update order status
- `GET /api/orders/sales/today` - Get today's sales
- `GET /api/orders/sales/week` - Get week's sales

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/juices-shakes` - Get juices and shakes
- `GET /api/menu/plates` - Get fruit plates
- `POST /api/menu/seed` - Seed menu items (one-time)

## Environment Variables

Create a `.env` file in the `server` directory:
```
MONGODB_URI=mongodb+srv://dev:dev@sipup.vyu5hra.mongodb.net/sipup?retryWrites=true&w=majority
PORT=5000
```

For frontend, create `.env.local` in root:
```
VITE_API_URL=http://localhost:5000/api
```

## Database Schema

### Order Model
```javascript
{
  orderId: String (unique),
  customerName: String,
  phone: String,
  items: Array,
  total: Number,
  paymentMode: String ('cash' | 'online'),
  status: String ('New' | 'Preparing' | 'Ready' | 'Completed'),
  timestamp: Date
}
```

### MenuItem Model
```javascript
{
  id: Number (unique),
  name: String,
  basePrice: Number,
  category: String ('juice' | 'shake' | 'plate'),
  baseFruit: String (optional)
}
```

## Troubleshooting

1. **Connection Error:** Make sure MongoDB Atlas allows connections from your IP (0.0.0.0/0 for development)
2. **Menu not loading:** Run the seed endpoint first
3. **CORS errors:** Make sure backend server is running on port 5000
4. **Orders not saving:** Check MongoDB connection string and network access
