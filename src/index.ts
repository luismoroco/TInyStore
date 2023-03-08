import serverSingleton from './patterns/server.Singleton';
import httpStatus from 'http-status';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT ?? 5000;

(async () => {
  try {
    serverSingleton.start(port as number);
  } catch (error) {
    console.log(httpStatus.INTERNAL_SERVER_ERROR.toString());
    process.exit(1);
  }
})();
