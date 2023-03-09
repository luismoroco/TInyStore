import serverSingleton from './patterns/server.Singleton';
import httpStatus from 'http-status';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT ?? 4000;

//Function identity<T>(arg: T): T {
//  return arg;
//}

(async () => {
  try {
    serverSingleton.start(port as number);
  } catch (error) {
    console.log(httpStatus.INTERNAL_SERVER_ERROR.toString());
    process.exit(1);
  }
})();
