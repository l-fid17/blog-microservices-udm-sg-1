FROM node:lts-alpine

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY package.json .
RUN yarn --prod

COPY . .

CMD ["yarn", "dev"]