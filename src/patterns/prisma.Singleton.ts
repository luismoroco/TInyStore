import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaSingleton;
  public client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }

    return PrismaSingleton.instance;
  }
}

export default PrismaSingleton.getInstance();
