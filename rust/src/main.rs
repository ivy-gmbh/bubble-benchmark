use tonic::{transport::Server, Request, Response, Status};

use sort::sort_service_server::{SortService, SortServiceServer};
use sort::List;

pub mod sort {
    tonic::include_proto!("sort.v1");
}

#[derive(Default)]
pub struct Sorter {}

#[tonic::async_trait]
impl SortService for Sorter {
    async fn bubble_sort(
        &self,
        request: Request<List>,
    ) -> Result<Response<List>, Status> {
        println!("Got a request from {:?}", request.remote_addr());

        let reply = request.into_inner();
        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:8000".parse().unwrap();
    let sorter = Sorter::default();

    println!("Server listening on {}", addr);

    Server::builder()
        .add_service(SortServiceServer::new(sorter))
        .serve(addr)
        .await?;

    Ok(())
}
