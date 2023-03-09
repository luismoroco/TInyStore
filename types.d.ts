/**
 * Extend Request from express
 */

declare namespace Express {
  export interface Request {
    userIdentify: number;
  }
}
