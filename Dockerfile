FROM node:6.9.1
MAINTAINER Jourdan Rodrigues

WORKDIR /project/

COPY . .
RUN npm install