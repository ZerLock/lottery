###
# Builder image
###
FROM node:16.14.2-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy source (see .dockerignore)
COPY . .

# Add env variables
ENV PORT=""

# Build source
RUN yarn run build

###
# Production image
###
FROM node:16.14.2-alpine

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .

COPY --from=builder /app .

# Copy code
COPY --from=builder /app/dist .

# Expose PORT
EXPOSE 3000

# Prefix commands and start production
ENTRYPOINT [ "yarn", "start" ]
