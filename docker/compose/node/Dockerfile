FROM node

RUN npm install pm2 -g

WORKDIR /src

COPY . /src

# EXPOSE 8080

CMD ["pm2-docker", "process.yml"]