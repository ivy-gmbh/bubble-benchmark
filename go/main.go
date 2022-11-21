package main

import (
	"context"
	"log"
	"net"
	"os"

	pb "bubblesort/gen/sort.v1"

	"google.golang.org/grpc"
)

type server struct {
  pb.UnimplementedSortServiceServer
}

func (s *server) BubbleSort(ctx context.Context, in *pb.List) (*pb.List, error) {
  for i:=0; i< len(in.Data)-1; i++ {
    for j:=0; j < len(in.Data)-i-1; j++ {
       if (in.Data[j] > in.Data[j+1]) {
          in.Data[j], in.Data[j+1] = in.Data[j+1], in.Data[j]
       }
    }
 }
 return in, nil
}

func main() {
  port := getEnv("PORT", "8080")
  listener, err := net.Listen("tcp", ":" + port)
  if err != nil {
    panic(err)
  }

  s := grpc.NewServer()
  pb.RegisterSortServiceServer(s, &server{})
  log.Printf("Starting server at port %s", port);
  if err := s.Serve(listener); err != nil {
    log.Fatalf("failed to serve: %v", err)
  }
}

func getEnv(key, defaultValue string) string {
  value := os.Getenv(key)
  if len(value) == 0 {
      return defaultValue
  }
  return value
}