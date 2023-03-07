FROM node:14

RUN ["mkdir", "backend"]

WORKDIR /backend

COPY . /backend

EXPOSE ${PORT}

RUN ["npm", "install"]

RUN ["npm", "install", "nodemon", "-g"]

CMD ["npm", "start"]