declare namespace Express {
  export interface Request {
    decodedUser?: {
      id?: number;
      username: string;
    };
  }
}
