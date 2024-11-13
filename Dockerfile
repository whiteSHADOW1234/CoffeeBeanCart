# Frontend build stage
FROM node:16 AS frontend-build

WORKDIR /frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend files and build
COPY frontend/ ./
RUN npm run build


# Backend build stage
FROM node:16 AS backend-build

WORKDIR /backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY backend/ ./

# Nginx stage for serving the frontend
FROM nginx:alpine AS frontend

COPY --from=frontend-build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Node stage for serving the backend
FROM node:16 AS backend

WORKDIR /backend

# Copy the built backend app
COPY --from=backend-build /backend /backend

EXPOSE 3001
CMD ["npm", "start"]
