FROM node:10 as ui-build
WORKDIR /usr/src/app
COPY client/ ./client
RUN cd client && npm install && npm run build

FROM node:10 as server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8080

CMD node index.js
