FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "dev"]