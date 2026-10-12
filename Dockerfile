# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY apps/server ./apps/server
COPY packages ./packages

# Install dependencies and build
RUN npm ci
RUN npm run build:server

# Production image
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

# Copy built application from builder
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Create logs directory
RUN mkdir -p logs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
