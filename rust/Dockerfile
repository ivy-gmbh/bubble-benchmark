FROM rust:1.65 as builder

RUN apt update && apt install -y protobuf-compiler

WORKDIR /app
COPY ./proto ./proto
COPY ./rust ./rust

WORKDIR /app/rust
RUN cargo build --release

FROM rust:1.65 AS runtime 

COPY --from=builder /app/rust/target/release/rust /usr/local/bin

EXPOSE 8000
CMD ["/usr/local/bin/rust"]
