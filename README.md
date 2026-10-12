# Cursor - AI Code Editor

## 🎯 Vision

The next-generation code editor powered by AI. Works seamlessly on web, mobile (iOS/Android), and desktop.

## 📦 Project Structure

```
cursor-android/
├── apps/
│   ├── web/                    # Next.js PWA (Netlify-ready)
│   ├── server/                 # Express API (Railway/Render)
│   └── mobile/                 # React Native/Android
├── packages/                   # Shared utilities
├── package.json               # Root workspace
└── README.md
```

## 🚀 Quick Start

### Web Development

```bash
npm install
npm run web:dev
# Open http://localhost:3000
```

### Web Build

```bash
npm run web:build
npm run start
```

## 🌐 Deploy to Netlify

1. Push to GitHub: `haseda0/cursor-android`
2. Go to [Netlify](https://app.netlify.com)
3. Click "Import from Git"
4. Select your repository
5. Build command: `npm install && npm run build`
6. Publish directory: `apps/web/.next`
7. Deploy!

## 🔗 Live Demo

- **Web**: https://cursor-ai.netlify.app
- **API**: https://cursor-api.railway.app (when deployed)

## 💻 Tech Stack

### Frontend
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend (Optional)
- Express.js
- PostgreSQL
- Redis
- Prisma ORM

### Mobile (Optional)
- React Native / Kotlin
- Android Studio

## 🎨 Features

- ✨ AI Code Completions
- 🎯 Smart Suggestions
- 📱 Responsive Mobile Design
- 🌙 Dark Mode
- ⚡ Lightning Fast
- 🔒 Secure & Private

## 📚 Documentation

- [Web App Docs](./apps/web/README.md)
- [API Docs](./apps/server/README.md) (coming soon)
- [Mobile Setup](./apps/mobile/README.md) (coming soon)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - See LICENSE file for details

## 🙋 Support

For issues or questions, please open an GitHub issue.

---

**Made with ❤️ by the Cursor Team**
