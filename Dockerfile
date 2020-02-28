FROM node:lts

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "start"]

# Set the user as node (prevents running in root mode)
USER node
