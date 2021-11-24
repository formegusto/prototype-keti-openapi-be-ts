declare namespace Express {
  export interface Request {
    decodedUser?: {
      username: String;
    };
  }
}
