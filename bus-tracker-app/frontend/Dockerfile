# Step 1: Build the Angular app
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Step 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/bus-tracker /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
