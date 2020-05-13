FROM node:12
# Create app directory
WORKDIR /usr/src/clean-node-api
# Install app dependencies
COPY package*.json ./
RUN npm install --only=prod
