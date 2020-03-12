FROM node:10.16.0

WORKDIR /pet-project-server/

ADD . /pet-project-server/

RUN npm install -g yarn
RUN yarn install
RUN yarn build

CMD ["yarn","start"]

