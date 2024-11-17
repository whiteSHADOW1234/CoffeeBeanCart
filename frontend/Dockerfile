FROM node:16 AS build-stage
WORKDIR /app

ARG API_BASE_URL

ENV API_BASE_URL=${API_BASE_URL}

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]