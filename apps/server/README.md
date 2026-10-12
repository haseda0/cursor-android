# Cursor AI Backend API

## 🚀 Production-Ready Express Server dengan OpenAI

### Endpoints

#### 1. Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Chat (Main Endpoint)
```
POST /api/chat

Request Body:
{
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"}
  ],
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "max_tokens": 1000
}

Response:
{
  "success": true,
  "data": "AI response here"
}
```

#### 3. Analyze Code
```
POST /api/analyze-code

Request Body:
{
  "code": "function hello() { console.log('test'); }",
  "language": "javascript"
}

Response:
{
  "success": true,
  "data": "Analysis results..."
}
```

#### 4. Generate Code
```
POST /api/generate-code

Request Body:
{
  "prompt": "Create a function that validates email",
  "language": "typescript"
}

Response:
{
  "success": true,
  "data": "Generated code..."
}
```

#### 5. Explain Code
```
POST /api/explain-code

Request Body:
{
  "code": "const arr = [1,2,3].map(x => x * 2);",
  "language": "javascript",
  "level": "beginner"
}

Response:
{
  "success": true,
  "data": "Explanation..."
}
```

## 🔧 Setup Local Development

### 1. Install Dependencies
```bash
cd apps/server
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=sk_test_your_key_here
FRONTEND_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Server akan jalan di `http://localhost:3001`

### 4. Build for Production
```bash
npm run build
```

## 🌐 Deploy to Railway/Render

### Deploy ke Railway

1. Buka https://railway.app
2. Click "New Project"
3. Connect GitHub repo
4. Select `apps/server`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI key
   - `FRONTEND_URL`: Your frontend URL (e.g., cursor-ai.netlify.app)
   - `NODE_ENV`: production
6. Deploy

### Deploy ke Render

1. Buka https://render.com
2. New → Web Service
3. Connect GitHub
4. Select repository
5. Root directory: `apps/server`
6. Build command: `npm install && npm run build`
7. Start command: `npm start`
8. Add environment variables
9. Deploy

## 🔒 Security Features

✅ Helmet.js for security headers
✅ CORS protection
✅ Rate limiting (100 requests per 15 min)
✅ Environment variable protection
✅ Input validation
✅ Error handling
✅ API key never exposed to client

## 📊 API Features

✅ Chat endpoint dengan multi-turn conversations
✅ Code analysis dengan AI
✅ Code generation dengan AI
✅ Code explanation dalam berbagai level
✅ Health check endpoint
✅ Rate limiting
✅ CORS enabled
✅ Error handling
✅ TypeScript support

## 🚀 Production Checklist

- [ ] OpenAI API key configured
- [ ] Frontend URL in CORS
- [ ] Rate limiting set appropriately
- [ ] Error handling tested
- [ ] API deployed to Railway/Render
- [ ] Environment variables secured
- [ ] Health check working
- [ ] Frontend calling backend endpoints

## 📈 Scaling

### Add Database
```bash
npm install @prisma/client
npm install -D prisma
```

### Add Authentication
```bash
npm install jsonwebtoken bcryptjs
```

### Add Caching
```bash
npm install redis
```

## 💡 Tips

- Monitor API costs di OpenAI dashboard
- Set max_tokens untuk kontrol biaya
- Cache responses jika memungkinkan
- Implement request queuing untuk high volume
- Add monitoring/logging untuk production

## 🐛 Troubleshooting

### Port already in use
```bash
lsof -i :3001
kill -9 <PID>
```

### OpenAI API errors
- Check API key di .env
- Check account balance
- Check rate limits
- Check model availability

---

Built with ❤️ for Cursor AI
