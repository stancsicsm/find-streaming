FROM busybox:latest

WORKDIR /home/static
COPY build /home/static

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
