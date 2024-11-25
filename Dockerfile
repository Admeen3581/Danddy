# A TEMPOTARY SOLUTION TO RUN THE APP IN DEV MODE
# In case we can't build and deploy this app.

# We need to find a way to host these containers and deploy them to the cloud
# We can use AWS, Azure, Google Cloud, or Heroku
# Unsure which would work for our case

# Use official Node.js image from Docker Hub
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# We can't build the app yet, so we'll just run it in dev mode
CMD ["npm", "run", "dev"]
