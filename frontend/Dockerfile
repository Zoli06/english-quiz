#FROM node:23-alpine AS build
#WORKDIR /frontend
#COPY package*.json .
#RUN npm i
#COPY . .
#RUN npm run build
#
#FROM nginx:1.23-alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /frontend/build /usr/share/nginx/html


FROM node:23-alpine AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
# COPY yarn.lock .
RUN npm i

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.27-alpine AS production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
