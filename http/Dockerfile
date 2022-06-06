# Import container with node v14
FROM node:14.19-buster

# Create app directory in out container
WORKDIR /app

# Bundle app source
COPY ./package.json ./package.json

# Install node_modules
RUN npm install

# Expose out HTTP port
EXPOSE 25665

# Start app in our container
CMD [ "npm", "run", "watch" ]