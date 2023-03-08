import express from 'express';

class ServerSingleton {
  private static instance: ServerSingleton;
  public app: express.Application;

  private constructor() {
    this.app = express();
  }

  public static getInstance(): ServerSingleton {
    if (!ServerSingleton.instance) {
      ServerSingleton.instance = new ServerSingleton();
    }

    return ServerSingleton.instance;
  }

  public start(port: number | undefined | 5000): void {
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
