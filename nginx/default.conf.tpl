server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ${DOMAIN};

    ssl_certificate ${SSL_CERT};
    ssl_certificate_key ${SSL_KEY};

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Additional SSL settings if needed...
    location / {
        root   /usr/share/nginx/html;

        index  index.html;
    }
}

