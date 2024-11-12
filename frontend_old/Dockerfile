FROM node:19-alpine AS build
WORKDIR /frontend
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html