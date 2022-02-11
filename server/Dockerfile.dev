FROM node:16-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]
