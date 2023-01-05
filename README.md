# Bubble Benchmark

Collection of similar bubblesort server implementations used to compare tech.

## Test:

250 concurent users over 10 minutes making requests to bubble sort a list of 1000 positive 32bit integers with a slack time of 100ms between requests.

The servers were deployed to GCP Cloud Run with the following spec:

```yaml
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: "1"
    spec:
      containerConcurrency: 80
      timeoutSeconds: 300
      containers:
        ports:
          - name: h2c
        resources:
          limits:
            cpu: 1000m
            memory: 512Mi
```

The client was ran as a Google Cloud Run Job with 2GB memory & 4 CPUs allocated.

## Results:

### Node:

| measure            | result                                                                |
| ------------------ | --------------------------------------------------------------------- |
| grpc_req_duration  | avg=804.74ms min=8.33ms med=863.37ms max=2.86s p(90)=1.2s p(95)=1.29s |
| iterations         | 164060 273.057755/s                                                   |
| image_size         | 45.5MB                                                                |
| cold_start         | p(50)=1018.7ms p(95)=1062.3ms p(99)=1066.2ms                          |
| memory_utilization | p(50)=10.5% p(95)=10.95% p(99)=10.99%                                 |
| cpu_utilization    | p(50)=79.5% p(95)=79.95% p(99)=79.99%                                 |

### Rust:

| measure            | result                                                                      |
| ------------------ | --------------------------------------------------------------------------- |
| grpc_req_duration  | avg=384.06ms min=7.3ms med=371.06ms max=1.12s p(90)=703.66ms p(95)=756.19ms |
| iterations         | 300960 501.256517/s                                                         |
| image_size         | 2.1MB                                                                       |
| cold_start         | p(50)=166.56ms p(95)=173.7ms p(99)=174.34ms                                 |
| memory_utilization | p(50)=1.5% p(95)=1.95% p(99)=1.99%                                          |
| cpu_utilization    | p(50)=80.5% p(95)=80.95% p(99)=80.99%                                       |

### Go:

| measure            | result                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| grpc_req_duration  | avg=565.12ms min=7.26ms med=540.23ms max=3.48s p(90)=1.05s p(95)=1.14s |
| iterations         | 221959 369.426767/s                                                    |
| image_size         | 3.2MB                                                                  |
| cold_start         | p(50)=295.08ms p(95)=307.72ms p(99)=308.85ms                           |
| memory_utilization | p(50)=4.5% p(95)=4.95% p(99)=4.99%                                     |
| cpu_utilization    | p(50)=84.5% p(95)=84.95% p(99)=84.99%                                  |

## Development

### Docker test services

```
docker build -t europe-west1-docker.pkg.dev/ivy-access/registry/bubble-node -f node/Dockerfile .
docker build -t europe-west1-docker.pkg.dev/ivy-access/registry/bubble-rust -f rust/Dockerfile .
docker build -t europe-west1-docker.pkg.dev/ivy-access/registry/bubble-go -f go/Dockerfile .
```

### Docker client

Set the environemnt variable TEST_SERVICE to rust/node/go, with 2GB memory / 4 CPU allocated.

```
docker build -t europe-west1-docker.pkg.dev/ivy-access/registry/bubble-client -f Dockerfile .
```

### Executing the test

Set the -e TEST_SERVICE value to rust/node/go to select the respective service.

```
k6 run -e TEST_SERVICE=<rust|node|go> --vus 250 --duration 120s test.js
```
