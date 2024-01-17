FROM node:16.18.0-alpine3.16

# To run the front&backends at the same time with docker:
# Install OpenJDK-17 (uncomment line 8) and
# @ openapitools.json : "useDocker": false
# Add your machines IP to BE .env ALLOWED_HOSTS && CORS_ALLOWED_ORIGINS

RUN apk add openjdk17

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY . .
# Install dependencies and build the React app
RUN npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "serve"]