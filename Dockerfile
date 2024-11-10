FROM busybox:latest

COPY build /home/static
COPY . /home/static

RUN ash -c 'echo $PWD > /home/static/pwd.txt'

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
