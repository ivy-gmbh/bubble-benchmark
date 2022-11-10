use std::env;
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
        let mut arr = request.into_inner().data;
        for i in 0..arr.len() {
            for j in 0..arr.len() - 1 - i {
                if arr[j] > arr[j + 1] {
                    arr.swap(j, j + 1);
                }
            }
        }
        Ok(Response::new(sort::List{
            data: arr,
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let port = env::var("PORT").unwrap_or("8000".to_string());
    let addr = format!("0.0.0.0:{port}").parse().unwrap();
    let sorter = Sorter::default();

    println!("Server listening on {}", addr);

    Server::builder()
        .add_service(SortServiceServer::new(sorter))
        .serve(addr)
        .await?;

    Ok(())
}
