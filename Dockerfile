FROM --platform=linux/amd64 node:18-alpine 

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "webhook-server.js" ]