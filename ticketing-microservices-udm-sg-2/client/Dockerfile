FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN yarn --prod
RUN yarn next telemetry disable
COPY . .

CMD ["yarn", "dev"]