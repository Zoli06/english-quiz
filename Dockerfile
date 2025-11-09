FROM node:22-alpine
WORKDIR /english-quiz
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
CMD [ "npm", "start" ]