server {
    listen 80;
    return         301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ${DOMAIN};
    
    ssl_certificate ${SSL_CERT};
    ssl_certificate_key ${SSL_KEY};

    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds)
    add_header Strict-Transport-Security "max-age=63072000" always;

    ssl_verify_client       on;
    ssl_trusted_certificate ${TRUSTED_CERT};

    # Additional SSL settings if needed...
    location / {
        root   /usr/share/nginx/html;

        index  index.html;
    }
}

