# Build Stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app

# Copy server dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --production

# Return to app root
WORKDIR /app

# Copy built frontend
COPY --from=builder /app/dist ./dist
# Copy server source
COPY --from=builder /app/server ./server
# Copy data constants
COPY --from=builder /app/src/constants ./src/constants

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server/server.js"]
