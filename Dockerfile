FROM nginx:alpine3.20

COPY /build/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

RUN mv index.html index.html.bak && mv app.html index.html