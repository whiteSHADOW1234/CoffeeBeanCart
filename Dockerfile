FROM node:16-alpine

WORKDIR /app
RUN npm install -g @babel/cli
COPY backend/package*.json ./backend/
RUN npm i --prefix backend

COPY backend/ ./backend

COPY frontend/package*.json ./frontend/
RUN npm i --prefix frontend

COPY frontend/ ./frontend

ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

RUN npm run build --prefix frontend

RUN rm -rf ./frontend/node_modules

CMD ["npm", "start", "--prefix", "backend"]