
FROM node:10.20.1-buster

COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install

ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 3000
EXPOSE 3002

ENTRYPOINT ["node_modules/.bin/serverless", "--host", "0.0.0.0", "offline"]
