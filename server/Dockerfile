FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest

RUN pnpm install && pnpm run build

EXPOSE 4020

CMD ["npm", "start"]