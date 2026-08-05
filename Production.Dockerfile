FROM node:24.13.0-alpine3.23 AS build

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
RUN npm ci
RUN npm run build

FROM nginx:1.29.4

ARG DOMAIN=localhost
ENV DOMAIN=$DOMAIN
ARG SSL_CERT=/etc/ssl/localhost.crt
ENV SSL_CERT=$SSL_CERT
ARG SSL_KEY=/etc/ssl/localhost.key
ENV SSL_KEY=$SSL_KEY
ARG API_URL=http://localhost:8000/
ENV API_URL=$API_URL


COPY --from=build /usr/src/app/dist /usr/share/nginx/html
#COPY /etc/ssl /etc/ssl
COPY --from=build /usr/src/app/ssl /etc

# Remove the default NGINX configuration (if any) and copy custom NGINX config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf.tpl /etc/nginx/default.conf.tpl

RUN export DOMAIN SSL_CERT SSL_KEY API_URL && envsubst '$$DOMAIN $$SSL_CERT $$SSL_KEY $$API_URL' < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf


# Expose port 80 for incoming traffic
EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 3000

# CMD ["npm", "run", "serve"]