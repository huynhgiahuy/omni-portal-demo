# syntax=docker/dockerfile:1
FROM node:14.20.1-alpine3.16 as builder

#ENV http_proxy http://proxy.hcm.fpt.vn:80
#ENV https_proxy http://proxy.hcm.fpt.vn:80

WORKDIR /opt/app


COPY package.json yarn.lock ./
# Install app dependencies
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6,id=scc/omnichannel/omni-portal yarn --frozen-lockfile

# App source
COPY ./ ./

RUN yarn build

# Build step for production
FROM nginx:1.23.1-alpine

ARG DIST_FOLDER=/opt/app/dist
ARG NGINX_CONFIG=default.conf

WORKDIR /usr/share/nginx/html


COPY --from=builder ${DIST_FOLDER} .
COPY ${NGINX_CONFIG} /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
