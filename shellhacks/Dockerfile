FROM node:19.4-alpine AS base

WORKDIR /shellhacks

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/shellhacks/.npm \
    npm set cache /shellhacks/.npm && \
    npm install

COPY . .

CMD ["npm", "run", "dev"]

FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/shellhacks/.npm \
    npm set cache /shellhacks/.npm && \
    npm ci --onlny=production

USER node

COPY --chown=node:node ./src/ .

EXPOSE $FRONTEND_PORT

CMD ["./deploy.sh"]