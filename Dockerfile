# Build the front-end using parcel
FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
COPY client ./client
RUN npm install parcel --no-save
RUN npm run build

# Create the server
FROM node:lts as app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Copy the built front-end files
COPY --from=builder /app/client/dist ./client/dist

CMD ["npm", "start"]

# Set the user as node (prevents running in root mode)
USER node
