FROM busybox:latest

WORKDIR /home/static
COPY build /home/static
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
