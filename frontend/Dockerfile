# Build Stage
FROM node:22.14.0-alpine3.20 AS builder

WORKDIR /app

# for .env (use --build-arg api-name Tag when building the image)
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL

COPY ./package*.json .

RUN npm install 

COPY . .
RUN npm run build

# Production Stage
FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


