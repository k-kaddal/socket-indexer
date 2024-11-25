FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn tsc

CMD ["yarn", "start"]
