FROM busybox:latest

RUN adduser -D static
USER static
WORKDIR /home/static

COPY ${BUILD_DIR} .

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
