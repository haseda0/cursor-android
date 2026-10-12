# 🚀 SUPER PROMPT - Cursor Android AI Code Editor

## Deskripsi Lengkap Proyek

Buatkan saya aplikasi AI code editor modern yang jauh lebih baik daripada Cursor, dengan fokus utama untuk:

✅ Bisa dipakai di Android/smartphone
✅ Bisa berjalan di web PWA
✅ Siap untuk di-hosting di internet
✅ UI/UX premium dan modern seperti IDE profesional
✅ Memiliki fitur AI untuk membantu coding, debugging, refactor, generate code
✅ Kompatibel dengan mobile dan desktop
✅ Banyak fitur unggulan seperti file explorer, tabs, terminal, AI chat, code generation

## Stack Teknologi

### Frontend
- **Framework**: React 18 + Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Editor**: Monaco Editor
- **State**: Zustand + React Query
- **PWA**: Service Workers, Workbox
- **Animations**: Framer Motion
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Auth**: JWT
- **Logging**: Winston
- **Deployment**: Railway/Render

### Mobile (Android)
- **Framework**: Kotlin + Jetpack Compose
- **Architecture**: MVVM
- **Networking**: Retrofit + OkHttp
- **Storage**: Room Database
- **DI**: Hilt
- **Deployment**: Google Play Store

## Fitur Utama

### Editor
- ✨ Multi-file editing dengan tabs
- 🎨 Syntax highlighting untuk 20+ languages
- 🔍 Find & replace dengan regex support
- 📏 Code formatting & linting
- 🔄 Undo/redo unlimited
- 💾 Auto-save ke cloud
- 🌙 Dark/Light theme

### AI Features
- 🤖 AI Chat dengan code context
- 🎯 Code generation dari prompt
- 🔧 Auto-fix bugs
- ♻️ Code refactoring
- 📚 Code documentation
- 💡 Smart suggestions
- 🎓 Code explanation

### Collaboration
- 👥 Real-time collaboration
- 💬 Comments & discussions
- 👤 Presence awareness
- 🔗 Shareable links

### Project Management
- 📁 File explorer
- 📊 Project structure
- 🔖 Bookmarks
- 🏷️ Tags & labels
- 🔍 Global search

## Struktur Proyek

```
cursor-android/
├── apps/
│   ├── web/                 # Next.js PWA Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   └── types/
│   │   ├── public/          # PWA assets
│   │   └── package.json
│   ├── server/              # Express Backend
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── database/
│   │   │   └── utils/
│   │   ├── prisma/
│   │   └── package.json
│   └── mobile/              # Android App
│       └── android/
│           └── app/
├── packages/                # Shared code
│   ├── ui/                  # UI components
│   ├── types/              # TypeScript types
│   └── hooks/              # Custom hooks
├── docker-compose.yml
├── Dockerfile
├── .github/workflows/       # CI/CD
├── DEPLOYMENT.md            # Deployment guide
├── README.md
└── .env.example
```

## Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Docker & Docker Compose (optional)
Android Studio (untuk mobile)
```

### Installation
```bash
# Clone
git clone https://github.com/haseda0/cursor-android.git
cd cursor-android

# Install
npm install

# Setup env
cp .env.example .env.local

# Database
npm run db:migrate
npm run db:seed

# Development
npm run dev
```

## Deployment

### Vercel (Frontend PWA)
```bash
vercel deploy --prod
```

### Railway/Render (Backend)
1. Connect GitHub repo
2. Add environment variables
3. Deploy

### Google Play Store (Android)
```bash
npm run build:android
# Upload APK to Play Store
```

## Quality Standards

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ 80%+ test coverage
- ✅ Security best practices
- ✅ Performance optimized
- ✅ Mobile first design
- ✅ Accessibility (WCAG 2.1)
- ✅ Production ready

## Monitoring

- 📊 Error tracking (Sentry)
- 📈 Analytics (Mixpanel)
- ⚠️ Uptime monitoring
- 🔍 Performance monitoring
- 📝 Logging (Winston)

## Support & Documentation

- 📖 Comprehensive README
- 🎓 API Documentation
- 💻 Code examples
- 🐛 Issue tracker
- 💬 Community discussions

## Lisensi

MIT - Feel free to use for any purpose

---

**Versi**: 1.0.0  
**Status**: Production Ready  
**Maintenance**: Active
