FROM node

RUN npm install pm2 -g

WORKDIR /src

COPY . /src

RUN npm install

CMD ["pm2-docker", "process.yml"]