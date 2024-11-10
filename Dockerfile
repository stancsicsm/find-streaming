FROM busybox:latest

WORKDIR /home/static

COPY build .

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
