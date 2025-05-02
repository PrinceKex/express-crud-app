FROM node:16-alpine

WORKDIR /app

# Install system dependencies for PostgreSQL
RUN apk add --no-cache python3 make g++ postgresql-dev

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 