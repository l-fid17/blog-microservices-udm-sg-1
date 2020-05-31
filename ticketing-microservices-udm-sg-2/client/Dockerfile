FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN yarn --prod
RUN npx next telemetry disable
COPY . .

CMD ["yarn", "dev"]