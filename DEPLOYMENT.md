# Deployment Guide - Cursor Android AI Code Editor

## Prerequisites

- Node.js >= 18.0.0
- Docker & Docker Compose (optional but recommended)
- Git
- npm >= 9.0.0

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/haseda0/cursor-android.git
cd cursor-android
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cursor_db"

# API Keys
OPENAI_API_KEY=your_key_here
JWT_SECRET=your_super_secret_key

# URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Local Development

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Setup database
npm run db:migrate
npm run db:seed

# Development
npm run dev
```

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Configure environment variables
5. Deploy

```bash
# Or deploy via CLI
vercel deploy --prod
```

### Backend (Railway/Render)

#### Railway

1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

#### Render

1. Go to https://render.com
2. Create "Web Service"
3. Connect GitHub
4. Configure:
   - Build: `npm install && npm run build:server`
   - Start: `npm start`
5. Add environment variables
6. Deploy

### Android App

#### Build APK

```bash
npm run build:android
# APK located at: apps/mobile/android/app/build/outputs/apk/
```

#### Release Build

```bash
# Generate signed APK (need keystore)
cd apps/mobile/android
./gradlew assembleRelease
```

#### Upload to Play Store

1. Create Google Play Developer account
2. Go to Google Play Console
3. Create new app
4. Upload APK/AAB
5. Configure store listing
6. Submit for review

### PWA Installation

The app is automatically PWA-ready:

1. Visit https://your-domain.com
2. Click install button (browser dependent)
3. App installs to home screen

## Database Migrations

```bash
# Create migration
npx prisma migrate dev --name add_feature

# Deploy to production
npx prisma migrate deploy

# View Prisma Studio
npm run studio
```

## Monitoring & Logs

```bash
# Backend logs
tail -f logs/combined.log

# Docker logs
docker-compose logs -f server

# Database logs
docker-compose logs -f postgres
```

## Performance Optimization

1. **Frontend**: Next.js automatically optimizes with:
   - Code splitting
   - Image optimization
   - CSS minification

2. **Backend**:
   - Redis caching
   - Database indexes
   - Rate limiting

3. **Mobile**:
   - Offline-first approach
   - Local storage caching
   - Minimal bundle size

## Security Checklist

- [ ] Change all default credentials
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set secure database backups
- [ ] Enable 2FA for deployment platforms
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable input validation

## Troubleshooting

### Database Connection Issues

```bash
# Check connection string
echo $DATABASE_URL

# Test with psql
psql $DATABASE_URL -c "SELECT 1"
```

### API Key Issues

```bash
# Verify keys are set
echo $OPENAI_API_KEY

# Test API connection
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules .next dist
npm install
npm run build
```

## Scaling

1. **Database**: Use connection pooling (PgBouncer)
2. **Cache**: Implement Redis for sessions
3. **CDN**: Use Cloudflare for static assets
4. **Load Balancer**: Use nginx/HAProxy
5. **Monitoring**: Implement Sentry/LogRocket

## Backup & Recovery

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Support

For issues:
1. Check logs
2. Review error messages
3. Check GitHub Issues
4. Contact support team
