# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/web ./apps/web
COPY packages ./packages

RUN npm ci
RUN npm run build:web

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package*.json ./

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]
