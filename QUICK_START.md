# 🚀 Quick Start - Get Both Indicators Green

## ⚡ 60-Second Setup

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
**Expected output:** `🚀 Server running on port 5001`

### Step 2: Start Frontend (Terminal 2)
```bash
npm install
npm run dev
```
**Expected output:** `VITE v7.1.7 ready in XXX ms`

### Step 3: Open Browser
```
http://localhost:3000
```

### Step 4: Click Chat Widget
- Wait 2-3 seconds for status check
- **Backend indicator:** 🟢 GREEN
- **AI indicator:** 🟢 GREEN

---

## ✅ Verification Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 3000
- [ ] `backend/.env` has `OPENROUTER_API_KEY` set
- [ ] Root `.env` has `VITE_API_URL=http://localhost:5001`
- [ ] Chat widget shows both indicators green
- [ ] Can send messages and get AI responses

---

## 🔧 Troubleshooting

### Backend indicator is red
```bash
# Check if backend is running
curl http://localhost:5001/api/health

# If error, restart backend:
cd backend
npm run dev
```

### AI indicator is red
```bash
# Check API key is set
cat backend/.env | grep OPENROUTER_API_KEY

# If empty, add your key:
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Restart backend
npm run dev
```

### Both indicators red
```bash
# Kill all processes
# Restart both servers from scratch
cd backend && npm run dev
# New terminal:
npm run dev
```

---

## 📤 Deploy to Vercel

### 1. Commit Changes
```bash
git add .
git commit -m "Improve: AI indicator reliability"
git push
```

### 2. Vercel Auto-Deploys
- Watch deployment at vercel.com
- Wait for "Ready" status

### 3. Test Live Site
```
https://vidyaraut.vercel.app
```
- Both indicators should be 🟢 GREEN

---

## 📝 Configuration

### Root `.env`
```env
VITE_BASE_URL=https://vidyaraut.vercel.app/
VITE_API_URL=http://localhost:5001
```

### Backend `.env`
```env
OPENROUTER_API_KEY=sk-or-v1-...
PORT=5001
```

---

## 🎯 Success Criteria

✅ **Backend indicator is GREEN** - Health endpoint responds 200 OK  
✅ **AI indicator is GREEN** - OpenRouter API key is configured  
✅ **Can send messages** - AI responds with portfolio context  
✅ **Works on Vercel** - Live site has both indicators green  

---

## 📞 Need Help?

1. Check `IMPROVEMENTS_APPLIED.md` for detailed changes
2. Review browser console for error messages
3. Verify all environment variables are set
4. Restart both servers and try again

---

**You're all set! 🎉**
