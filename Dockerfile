FROM node:20

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV TZ Europe/Moscow
ENV NODE_ENV production

WORKDIR /home
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run start
