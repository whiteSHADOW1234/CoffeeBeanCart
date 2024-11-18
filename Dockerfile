# Stage 1: Build the React application and backend
FROM node:16-alpine AS build-stage

WORKDIR /app

RUN npm install -g @babel/plugin-proposal-private-property-in-object

# Install Node dependencies for backend
COPY backend/package*.json ./backend/
RUN npm ci --only=production --prefix backend

# Copy backend code
COPY backend ./backend

# Install Node dependencies for frontend
COPY frontend/package*.json ./frontend/
RUN npm ci --only=production --prefix frontend

# Copy frontend code
COPY frontend ./frontend

# Build the React app using react-scripts
RUN cd frontend && npm run build && cd ..
RUN rm -rf ./frontend/node_modules

ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

CMD ["npm", "start", "--prefix", "backend"]