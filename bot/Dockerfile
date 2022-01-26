FROM node:16.13-alpine3.14

WORKDIR /balti

COPY package.json .

RUN npm i

COPY . .

ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
