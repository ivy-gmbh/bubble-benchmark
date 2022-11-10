FROM rust:1.65 as builder

RUN apt update && apt install -y protobuf-compiler

WORKDIR /app
COPY ./proto ./proto
COPY ./rust ./rust

WORKDIR /app/rust
RUN rustup target add x86_64-unknown-linux-musl
RUN cargo build --target x86_64-unknown-linux-musl --release --bin rust

FROM scratch AS runtime 
WORKDIR /app
COPY --from=builder /app/rust/target/x86_64-unknown-linux-musl/release/rust ./
CMD ["/app/rust"]
