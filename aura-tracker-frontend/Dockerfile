# 1) Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build     # produces /app/build

# 2) Nginx stage
FROM nginx:stable-alpine
# Remove default config
RUN rm /etc/nginx/conf.d/default.conf
# Copy our SPA nginx config
COPY nginx.conf /etc/nginx/conf.d/frontend.conf
# Copy built static files
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
