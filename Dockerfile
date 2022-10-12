# stage1 as builder
FROM node:13.10.1 AS builder
# Create a directory where our app will be placed
RUN mkdir /app-ui
# copy the package.json to install dependencies
COPY ./package.json /app-ui
COPY ./package-lock.json /app-ui
# Change directory so that our commands run inside this new directory
WORKDIR /app-ui


# Install dependecies
RUN npm ci
# Copy dependency definitions
ADD . /app-ui
# Get all the code needed to run the app
COPY . /app-ui
# Build the project and copy the files
ARG ENV_NAME
ENV ENV_NAME=${ENV_NAME}

RUN echo "Environment: ${ENV_NAME}"

# this will build the browser and server files:
RUN npm run build:ssr-${ENV_NAME}

FROM nginx:1.16.1 AS frontend-browser
COPY --from=builder /app-ui/dist/AngularJwtAuth/browser/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
#EXPOSE 80



FROM node:13.10.1-alpine AS ssr-server
COPY --from=builder /app-ui/dist /app-ui/dist/
COPY ./package.json /app-ui
WORKDIR /app-ui
EXPOSE 4000
CMD npm run serve:ssr

