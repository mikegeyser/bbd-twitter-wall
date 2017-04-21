# Create image based on the official Node 6 image from the dockerhub
FROM node:alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/api
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/dist
WORKDIR /usr/src/dist

# Install global dependecies
RUN npm install -g yarn
RUN npm install -g @angular/cli
RUN npm install -g typescript

# Build app

COPY app/* /usr/src/app
RUN yarn install
RUN ng build --prod

# Build api
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
