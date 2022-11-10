import { list } from '../../gen/grpc/sort';

export async function bubbleSort(request: list): Promise<list> {
  request.data = request.data.slice();

  for (let i = 0; i < request.data.length; i++) {
    for (let j = 0; j < request.data.length - 1; j++) {
      if (request.data[j] > request.data[j + 1]) {
        const swap = request.data[j];
        request.data[j] = request.data[j + 1];
        request.data[j + 1] = swap;
      }
    }
  }
  return request;
}
