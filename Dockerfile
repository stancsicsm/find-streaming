FROM busybox:latest

COPY build /home/static
COPY . /home/static

# save the pwd to a txt file
RUN echo $PWD > /home/static/pwd.txt

EXPOSE 3001

CMD ["busybox", "httpd", "-f", "-v", "-p", "3001"]
