FROM node:25

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/src ./src

COPY frontend/public /app/frontend/public

EXPOSE 3000
CMD ["node", "src/server.js"]

