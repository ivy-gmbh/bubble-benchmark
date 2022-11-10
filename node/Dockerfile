FROM node:16-alpine AS builder
RUN apk add --no-cache git protoc protobuf-dev

WORKDIR /app
COPY node/package*.json ./
RUN npm ci

COPY ./protos/ ./protos/
COPY ./node/ ./node/

WORKDIR /app/node
RUN npm run build

CMD ["npm", "start"]

FROM node:16-alpine AS server
WORKDIR /app
COPY node/package*.json ./
COPY --from=builder app/node/dist ./dist

RUN npm ci --omit dev

EXPOSE 8000
ENTRYPOINT [ "node" ]
CMD ["dist/src/index.js"]
