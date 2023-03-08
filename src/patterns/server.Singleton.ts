import express, { Application, urlencoded } from 'express';
import { json } from 'body-parser';

class ServerSingleton {
  private static instance: ServerSingleton;
  public app: Application;

  private constructor() {
    this.app = express();
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  public static getInstance(): ServerSingleton {
    if (!ServerSingleton.instance) {
      ServerSingleton.instance = new ServerSingleton();
    }

    return ServerSingleton.instance;
  }

  public start(port: number): void {
    try {
      this.app.listen(port, () => {
        console.log(`RUNNING IN PORT ${port}`);
      });
    } catch (error) {
      console.log(`Error at PORT`);
    }
  }
}

export default ServerSingleton.getInstance();
