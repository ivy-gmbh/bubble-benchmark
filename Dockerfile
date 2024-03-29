FROM grafana/k6 AS runner
WORKDIR /app
COPY ./proto ./proto
COPY test.js ./
CMD ["run", "--vus", "250", "--duration", "120s", "/app/test.js"]
