import serverSingleton from './patterns/server.Singleton';
import httpStatus from 'http-status';
import * as dotenv from 'dotenv';
//import { initSchedulerForMail } from './services/mail';

dotenv.config();

const port = process.env.APP_PORT ?? 4000;

(async () => {
  try {
    serverSingleton.start(port as number);
    //initSchedulerForMail();
  } catch (error) {
    console.log(httpStatus.INTERNAL_SERVER_ERROR.toString());
    process.exit(1);
  }
})();
