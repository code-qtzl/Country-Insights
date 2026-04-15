FROM node:24-alpine AS build-stage

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_WEATHER_API_KEY
ARG VITE_MAPS_API_KEY
ARG VITE_BASE_URL_COUNTRIES

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
