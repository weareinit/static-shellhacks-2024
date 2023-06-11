# Development stage for development
FROM node:19.4-alpine AS Development
ENV NODE_ENV development
ENV PORT 8000

COPY package*.json ./

RUN --mount=type=cache,target=/backend/.npm \
    npm set cache /backend/.npm && \
    npm install

COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]

# Builder for productions
FROM --platform=linux/amd64 node:19.4-alpine as Builder
WORKDIR /backend

ENV NODE_ENV production
ENV PORT 8000

COPY package*.json ./

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm install typescript -g
RUN npm install tsc-alias -g
RUN tsc && tsc-alias 
# Server stage to host generated files for production
FROM --platform=linux/amd64 node:19.4-alpine as Production
WORKDIR /backend

COPY package*.json ./

ENV NODE_ENV production
ENV PORT 8000

RUN --mount=type=cache,target=/backend/.npm \
    npm set cache /backend/.npm && \
    npm ci --only=production
# Copy node_modules (including prisma client)
COPY --from=builder /backend/node_modules ./node_modules
# Copy prisma schema
COPY --from=builder /backend/prisma ./prisma
# Copy compiled JS files
COPY --from=builder /backend/dist ./dist
# Generate Prisma Client again to ensure it's linked properly
RUN npx prisma generate

EXPOSE $PORT

CMD ["npm", "start"]
