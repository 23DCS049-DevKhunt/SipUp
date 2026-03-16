# SipUp - Deployment Guide

This guide will walk you through the steps to deploy the SipUp application (MERN Stack) to production for free. 
We will use **Render** for the Express/Node.js backend and **Vercel** for the Vite/React frontend.

## Prerequisites
1. A GitHub account with the code pushed (which you've just done!).
2. A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (if you haven't set up cloud DB yet).
3. A free [Render](https://render.com/) account (for backend).
4. A free [Vercel](https://vercel.com/) account (for frontend).

---

## Step 1: Set Up MongoDB Cloud Database
If you are currently using `mongodb://localhost:27017` for an offline local database, you must switch to a cloud database so your live backend can access it.

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free "M0" Cluster.
3. Under **Database Access**, create a new database user (save the username and password).
4. Under **Network Access**, add the IP Address `0.0.0.0/0` (Allows access from anywhere, so Render can connect).
5. Click **Connect** on your cluster, select **Drivers**, and copy the Connection String.
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your actual credentials.

---

## Step 2: Deploy Backend on Render
Render is a great platform for hosting Node.js servers.

1. Log into [Render](https://render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub account and select the `SipUp` repository.
3. Fill out the details:
   - **Name**: `sipup-backend` (or similar)
   - **Region**: Choose one closest to you (e.g., Singapore or Frankfurt).
   - **Branch**: `main`
   - **Root Directory**: `server` *(Important! Since the backend is in the server folder)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**: Click "Advanced" to add your `.env` variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: *Paste the connection string you got from MongoDB Atlas.*
5. Click **Create Web Service**.
6. Wait 2-3 minutes for the deployment to finish. Once done, Render will give you a live URL (e.g., `https://sipup-backend-xyz.onrender.com`).
   - *Save this URL! You will need it for the frontend.*

---

## Step 3: Deploy Frontend on Vercel
Vercel is the best platform for React/Vite frontends.

1. Log into [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
2. Connect your GitHub account and import the `SipUp` repository.
3. Fill out the configuration:
   - **Project Name**: `sipup-website`
   - **Framework Preset**: Vercel should auto-detect **Vite**.
   - **Root Directory**: Leave it as the default `/` (since frontend `package.json` is in the root).
4. **Environment Variables**:
   - Name: `VITE_API_URL`
   - Value: *Paste the backend URL from Render* (e.g., `https://sipup-backend-xyz.onrender.com/api`).
     - **Important**: Make sure to append `/api` to the backend URL if your routes use it, but based on your local `vite.config.js` or `api.js`, set it exactly as your frontend expects to contact the API!
5. Click **Deploy**.
6. Wait for the build to complete (usually less than a minute). 

---

## Step 4: Final Verification
1. Visit the live Vercel URL (e.g., `https://sipup-website.vercel.app`).
2. Test the core functionalities:
   - Navigate to the Menu page.
   - Add items to the cart and checkout.
   - Visit the Admin panel (`/admin`) and login with `admin`/`sipup123` to verify sales and incoming orders.

---

### Troubleshooting
- **Frontend shows "Network Error"**: This means the frontend cannot reach the backend. Ensure your `VITE_API_URL` in Vercel perfectly matches your live Render URL. Also verify CORS headers on your backend allow the Vercel domain.
- **Backend fails to start**: Check the Render deployment logs. It is frequently caused by forgetting a `.env` variable or a bad MongoDB connection string.
- **Render sleeps**: Remember that on the free tier of Render, the backend server goes to sleep after 15 minutes of inactivity. When a user visits the site, the first API request might take 30-50 seconds as the server wakes up.
