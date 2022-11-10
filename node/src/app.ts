import { createServer } from 'nice-grpc';
import { HealthDefinition, HealthServiceImpl } from 'nice-grpc-server-health';

import { SortServiceDefinition } from '../gen/grpc/sort';
import { bubbleSort } from './controllers/bubbleSort';

const app = createServer();

app.add(HealthDefinition, HealthServiceImpl());

app.add(SortServiceDefinition, {
  bubbleSort,
});

export default app;
