# Go

### development

Generate code with:

```
protoc --proto_path=../proto ../proto/*.proto --go_out=gen --go-grpc_out=gen
```

Start the server with:

```
go run main.go
```

Build the app with:

```
RUN go build -o ./dist/bubblesort
```
