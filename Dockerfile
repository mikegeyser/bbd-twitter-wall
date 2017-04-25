FROM node:alpine
RUN mkdir -p /usr/bbd-twitter-wall/
COPY api/ /usr/bbd-twitter-wall/
COPY app/dist/ /usr/bbd-twitter-wall/src/public/
WORKDIR /usr/bbd-twitter-wall/
EXPOSE 3000

CMD ["node", "src/index.js"]