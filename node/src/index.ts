import 'dotenv/config';

import app from './app';

const PORT = process.env.PORT ?? 8000;

app.listen(`0.0.0.0:${PORT}`).then(() => {
  console.info(`Server is running and listening at port ${PORT}`);
});
