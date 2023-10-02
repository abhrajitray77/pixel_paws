FROM node:18.18.0-alpine3.18

WORKDIR /dockerApp

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]