FROM node:14

RUN ["mkdir", "shellhacks"]

COPY . /shellhacks

WORKDIR /shellhacks

RUN ["npm", "install"]

CMD ["npm", "run", "dev"]