# A TEMPOTARY SOLUTION TO RUN THE APP IN DEV MODE
# We can't build the app yet, so we'll just run it in dev mode

# Use official Node.js image from Docker Hub
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
