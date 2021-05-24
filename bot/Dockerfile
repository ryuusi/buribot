FROM alpine:latest  as wait_for_it
WORKDIR /usr/app
RUN apk --no-cache add git && git clone https://github.com/vishnubob/wait-for-it.git

FROM node:16-alpine3.11
ENV HOST=localhost PORT=25565 TIMEOUT=120
WORKDIR /usr/app
RUN apk --no-cache add bash
COPY --from=wait_for_it /usr/app/wait-for-it ./wait-for-it
COPY ./mineflayer ./bot
WORKDIR /usr/app/bot
RUN npm install
CMD ../wait-for-it/wait-for-it.sh ${HOST}:${PORT} -s --timeout=${TIMEOUT} -- node ./main.js