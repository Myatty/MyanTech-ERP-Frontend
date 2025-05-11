# Build Stage
FROM node:22.14.0-alpine3.20 AS builder

WORKDIR /app

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


