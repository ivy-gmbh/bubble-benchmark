FROM golang:1.19-alpine AS builder

RUN apk add --no-cache git protoc protobuf-dev

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2

WORKDIR /app
COPY ./proto ./proto
COPY ./go ./go

WORKDIR /app/go
RUN go mod download

RUN mkdir gen
RUN protoc --proto_path=../proto ../proto/*.proto --go_out=gen --go-grpc_out=gen

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o ./dist/bubblesort

FROM scratch AS runtime 
COPY --from=builder /app/go/dist/bubblesort /go/bin/bubblesort
EXPOSE 8080
ENTRYPOINT ["/go/bin/bubblesort"]
