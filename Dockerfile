FROM node:19.7.0-alpine3.16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet
COPY . .
RUN npm run build


