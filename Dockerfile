FROM node:7.5.0-alpine

ADD . /app

RUN cd /app; \
    npm cache clean && \
    npm install --silent --progress=false --production

EXPOSE 3000

WORKDIR /app
RUN echo "$PWD"
CMD ["node", "/app/src/index.js"]
