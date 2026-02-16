FROM node:25

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install -g npm@11.10.0

COPY backend/src ./src

# Optional for production builds (in dev we mount with volumes)
# Copy static frontend into image so it runs without bind-mounts
COPY frontend/public /app/frontend/public

EXPOSE 3000
CMD ["node", "src/server.js"]

