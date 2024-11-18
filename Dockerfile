FROM node:16-alpine AS build-stage

WORKDIR /app

RUN npm install -g @babel/cli
COPY backend/package*.json ./backend/
RUN npm ci --only=production --prefix backend

COPY backend ./backend
RUN npm run build --prefix backend

COPY frontend/package*.json ./frontend/
RUN npm ci --only=production --prefix frontend

COPY frontend ./frontend
RUN npm run build --prefix frontend

ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

RUN npm run build --prefix frontend

RUN rm -rf ./frontend/node_modules

COPY ./frontend/build /usr/share/nginx/html

CMD ["npm", "start", "--prefix", "backend"]