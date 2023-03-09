import bcrypt from 'bcryptjs';

interface Actions {
  encrypt(password: string): Promise<string>;
  decrypt(password: string): Promise<boolean>;
}

class BCrypter implements Actions {
  public async encrypt(password: string): Promise<string> {
    const wordPrev = await bcrypt.genSalt(10);
    return bcrypt.hash(password, wordPrev);
  }

  public async decrypt(password: string): Promise<boolean> {
    console.log(password);
    return await false;
  }
}

export const cryptoEngine = new BCrypter();
