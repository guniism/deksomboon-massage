# Step 1: Build the app using Node
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Run with minimal image using Next.js' built-in server
FROM node:18-slim

WORKDIR /app

# Only copy necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
