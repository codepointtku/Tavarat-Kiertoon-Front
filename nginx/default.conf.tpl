server {
    listen 80;
    server_name ${DOMAIN};
    location / {
        root /usr/share/nginx/html;

        index index.html;
        try_files $uri /index.html;
    }
    location /api/ {
        proxy_pass ${API_URL};
        proxy_ssl_server_name on;
        proxy_http_version 1.1;
    }
}

