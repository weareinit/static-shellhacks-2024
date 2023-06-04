# Development Image
FROM node:19.4-alpine AS Development

WORKDIR /shellhacks
COPY package*.json ./

ENV NODE_ENV development
ENV FRONTEND_PORT 3000

RUN --mount=type=cache,target=/shellhacks/.npm \
    npm set cache /shellhacks/.npm && \
    npm install

COPY . .

CMD ["npm", "run", "dev"]

# Production Image
FROM --platform=linux/amd64 node:19.4-alpine AS Production

WORKDIR /shellhacks
COPY package*.json ./

ENV NODE_ENV production
ENV FRONTEND_PORT 3000

RUN --mount=type=cache,target=/shellhacks/.npm \
    npm set cache /shellhacks/.npm && \
    npm ci --only=production

COPY . .

# Copy the deploy.sh file and ensure it has execute permissions
COPY deploy.sh /shellhacks/
RUN chmod +x /shellhacks/deploy.sh

RUN npx tailwindcss -o build.css --minify

EXPOSE 3000

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]