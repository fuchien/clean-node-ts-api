FROM node:12
# Create app directory
WORKDIR /usr/src/clean-node-api
# Install app dependencies
COPY package*.json ./
RUN npm install --only=prod
COPY ./dist ./dist
# Copy app source code

#Expose port and start application
EXPOSE 5000
CMD [ "npm", "start" ]
