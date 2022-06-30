FROM node:alpine
EXPOSE 8080
WORKDIR /home/node
COPY package.json .
RUN npm install
COPY . .
ENTRYPOINT ["node", "index.js"]