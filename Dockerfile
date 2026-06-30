FROM docker.io/oven/bun:latest
WORKDIR /app
COPY server/package.json bun.lock ./
RUN bun install
COPY server/ ./
EXPOSE 3000
CMD ["bun", "server.ts"]
