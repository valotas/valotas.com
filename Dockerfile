FROM joseluisq/static-web-server:2

COPY ./packages/web/dist/ /public/
COPY ./packages/docker /etc/static-web-server

ENV SERVER_CONFIG_FILE=/etc/static-web-server/sws.config.toml

EXPOSE 80