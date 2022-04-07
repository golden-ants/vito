FROM node:16.14.2-alpine3.15
WORKDIR /usr/app/build
COPY . .
RUN npm i && npm run build

FROM node:16.14.2-alpine3.15
WORKDIR /usr/app
COPY --from=0 /usr/app/build/dist ./dist
COPY --from=0 /usr/app/build/package.json .
COPY --from=0 /usr/app/build/node_modules ./node_modules
ENTRYPOINT ["npm", "run", "start:prod"]
