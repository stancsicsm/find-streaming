FROM busybox:latest

COPY build /home/static
COPY . /home/static

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
