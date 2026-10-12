# Cursor - AI Code Editor

> Premium AI-powered code editor for web, mobile, and desktop

## 🚀 Features

- ✨ AI-powered code completions
- 🎨 Modern, responsive UI
- ⚡ Lightning-fast performance
- 📱 Mobile-friendly design
- 🔒 Secure & private
- 🌙 Dark mode by default

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📤 Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy

## 📚 Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/         # React components
├── public/                 # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── netlify.toml           # Netlify config
```

## 🚀 Performance

- Page load: < 2s
- TTI: < 3s
- Lighthouse: 95+
- Mobile-first design
- Optimized assets

## 🔐 Security

- HTTPS only
- No tracking
- No cookies
- Privacy-focused

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 📝 License

MIT License - Feel free to use this project

---

Built with ❤️ for developers
