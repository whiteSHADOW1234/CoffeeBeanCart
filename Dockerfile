FROM node:16-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
RUN npm ci --only=production --prefix backend

COPY backend/ ./backend

COPY frontend/package*.json ./frontend/
RUN npm ci --only=production --prefix frontend

COPY frontend/ ./frontend

ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

RUN npm run build --prefix frontend

RUN rm -rf ./frontend/node_modules

CMD ["npm", "start", "--prefix", "backend"]