FROM mhart/alpine-node:14
# Install Utilities
RUN apk update
RUN apk add git
# Add parent directory
WORKDIR /home/node
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Install dependencies in /node
RUN npm install && npm cache clean --force
# Create app directory
# node_modules will be in parent folder,
# hence it will be not visible from host file system
WORKDIR /home/node/src
# Install bower
RUN npm install --global bower
# Install app bower dependencies
COPY .bowerrc bower.json ./
RUN bower install
# Bundle app source
COPY ./public ./public
COPY config.json ./
COPY app.js ./
# Server listens on
EXPOSE 3000
CMD [ "node", "app.js" ]