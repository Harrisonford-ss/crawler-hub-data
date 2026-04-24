FROM caddy:2-alpine
COPY index.html tools.html app.css app.js /srv/
COPY data /srv/data/
RUN echo ':8080 {' > /etc/caddy/Caddyfile && \
    echo '  root * /srv' >> /etc/caddy/Caddyfile && \
    echo '  file_server' >> /etc/caddy/Caddyfile && \
    echo '  try_files {path} {path}.html /index.html' >> /etc/caddy/Caddyfile && \
    echo '  header /data/*.json Cache-Control "public, max-age=60"' >> /etc/caddy/Caddyfile && \
    echo '  header /*.css Cache-Control "public, max-age=86400"' >> /etc/caddy/Caddyfile && \
    echo '  header /*.js Cache-Control "public, max-age=86400"' >> /etc/caddy/Caddyfile && \
    echo '}' >> /etc/caddy/Caddyfile
EXPOSE 8080
