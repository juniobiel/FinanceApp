# Source and Build
FROM node:latest AS ng-builder
run mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN $(npm bin)/ng build --prod