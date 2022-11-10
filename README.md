# Bubble Benchmark

Collection of similar bubblesort server implementations used to compare tech.

## Test:

250 concurent users making requests to bubble sort a list of 1000 positive 32bit integers with a slack time of 100ms between requests.

The servers were deployed to GCP Cloud Run with the following spec:

```yaml
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '1'
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

## Results:

### Node:

| measure            | result                                                                      |
| ------------------ | --------------------------------------------------------------------------- |
| grpc_req_duration  | avg=634.87ms min=29.8ms med=801.3ms max=2.12s p(90)=911.73ms p(95)=936.19ms |
| iterations         | 170535 283.822846/s                                                         |
| image_size         | 135MB                                                                       |
| cold_start         | p(50)=662.64ms p(95)=1057.49ms p(99)=1065.25ms                              |
| memory_utilization | p(50)=11.5% p(95)=11.95% p(99)=11.99%                                       |
| cpu_utilization    | p(50)=75.5% p(95)=75.95% p(99)=75.99%                                       |

### Rust:

| measure            | result                                                                    |
| ------------------ | ------------------------------------------------------------------------- |
| grpc_req_duration  | avg=66.69ms min=29.12ms med=38.97ms max=2.13s p(90)=59.36ms p(95)=80.12ms |
| iterations         | 225050 374.637457/s                                                       |
| image_size         | 7.6MB                                                                     |
| cold_start         | p(50)=125.14ms p(95)=130.5ms p(99)=130.98ms                               |
| memory_utilization | p(50)=1.5% p(95)=1.95% p(99)=1.99%                                        |
| cpu_utilization    | p(50)=70.5% p(95)=70.95% p(99)=70.99%                                     |
