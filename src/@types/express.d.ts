declare namespace Express {
  export interface Request {
    decodedUser?: {
      username: string;
      nickname: string;
    };
  }
}
