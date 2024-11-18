FROM node:16-alpine

WORKDIR /app
RUN npm install -g @babel/cli
COPY backend/package*.json ./backend/
RUN npm i --prefix backend

COPY backend/ ./backend

COPY frontend/package*.json ./frontend/
RUN npm i --prefix frontend

COPY frontend/ ./frontend

# other instructions
ARG API_BASE_URL # Set environment variables using build arguments
ARG DB_HOST # This passes these values at build time
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_DATABASE

#Set those build arguments as environment variables.
ENV API_BASE_URL=${API_BASE_URL}
ENV DB_HOST=${DB_HOST}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}

RUN npm run build --prefix frontend

RUN rm -rf ./frontend/node_modules

CMD ["npm", "start", "--prefix", "backend"]