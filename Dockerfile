FROM busybox:latest

RUN adduser -D static
USER static
WORKDIR /home/static

COPY /home/runner/work/find-streaming/find-streaming/build .

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
