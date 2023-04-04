
FROM node:19.4-alpine AS base

WORKDIR /backend

COPY package*.json ./

FROM base as dev

ENV NODE_ENV development

RUN --mount=type=cache,target=/backend/.npm \
    npm set cache /backend/.npm && \
    npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/backend/.npm \
    npm set cache /backend/.npm && \
    npm ci --only=production

USER node

COPY --chown=node:node ./src/ .

RUN npx prisma generate

EXPOSE $PORT


CMD ["npm", "start"]