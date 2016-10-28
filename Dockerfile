FROM node:6.8.0
MAINTAINER Jourdan Rodrigues

WORKDIR /project/

COPY . .
RUN npm install && npm install -g gulp