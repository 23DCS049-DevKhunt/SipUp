# Starting Frontend Server

## Quick Start

The frontend server is configured to run on **port 3000**.

### To Start Manually:

```bash
npm run dev
```

### Expected Output:

You should see something like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api (must be running separately)

## If Port 3000 is Busy

Vite will automatically try the next available port (usually 3001, 3002, etc.)

Check the terminal output to see which port it's actually using.

## Troubleshooting

### Frontend won't start?
1. Make sure you're in the root directory (`d:\sipup`)
2. Check if `node_modules` exists: `Test-Path node_modules`
3. If missing, install: `npm install`

### Port already in use?
- Kill the process: `Get-NetTCPConnection -LocalPort 3000 | Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force`
- Or change port in `vite.config.js`

### Can't connect to backend?
- Make sure backend is running: `cd server && npm run dev`
- Check backend health: http://localhost:5000/api/health

## Current Status

✅ Frontend configured for port 3000
✅ Backend running on port 5000
✅ MongoDB connected
✅ Menu items seeded

---

**The frontend server should now be starting! Check your terminal for the local URL.**
