# ----------------------------
# Stage 1
# Base image contains the node version and the appuser configurations
FROM node:23-alpine3.20 AS base-image
WORKDIR /usr/src/app/sherpal-fe
RUN addgroup -g 1001 sherpaluser && \
    adduser -S -u 1001 -G sherpaluser sherpaluser && \
    chown -R sherpaluser:sherpaluser /usr/src/app/sherpal-fe && \
    chmod -R +x  /usr/src/app/sherpal-fe

# ----------------------------
# Stage 2
# Copy application into docker environment
FROM base-image AS sherpal-code-copy
WORKDIR /usr/src/app/sherpal-fe
USER 1001
COPY --chown=sherpaluser:sherpaluser ./ .

# ----------------------------
# Stage 3
# Install dependencies
FROM sherpal-code-copy AS sherpal-dependency-install
WORKDIR /usr/src/app/sherpal-fe
USER 1001
RUN npm ci

# ----------------------------
# Stage 4
# Install dependencies
FROM sherpal-dependency-install AS sherpal-build
WORKDIR /usr/src/app/sherpal-fe
USER 1001
RUN npm run build

# ----------------------------
# Final stage
# Start static webpage on nginx server
FROM nginx:alpine
COPY --from=sherpal-build /usr/src/app/sherpal-fe/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]