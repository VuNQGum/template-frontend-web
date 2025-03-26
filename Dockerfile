FROM registry.evn.com.vn/base/node:18-buster-slim as build

WORKDIR /src

COPY package.json .nvmrc .npmrc ./

RUN npm config set fund false && \
    npm install -g npm@10.7.0 && \
    npm install 

COPY . .

RUN npm run build

# Using nginx to serve front-end
FROM registry.evn.com.vn/base/nginx:mainline

RUN apt-get update && apt-get install -y net-tools curl iputils-ping telnet nano vim dnsutils

EXPOSE 8080

WORKDIR /var/www/html

USER root
RUN chmod -R g+w /var/cache/
RUN chmod -R g+w /var/run/

# V1: Copy built artifacts
# COPY --from=build ./src/dist/fuse ./

# V1: Copy nginx configuration folder
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# V2: Copy built artifacts
COPY --from=build src/dist/fuse /usr/share/nginx/html/hrms

# V2: Copy nginx configuration folder
COPY nginx.conf /etc/nginx/nginx.conf

