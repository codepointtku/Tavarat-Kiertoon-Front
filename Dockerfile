FROM node:16.18.0-alpine3.16 as build

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

FROM nginx:1.25.3-alpine3.18

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/ssl /etc/ssl

# Remove the default NGINX configuration (if any) and copy custom NGINX config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


# Expose port 80 for incoming traffic
EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 3000

# CMD ["npm", "run", "serve"]