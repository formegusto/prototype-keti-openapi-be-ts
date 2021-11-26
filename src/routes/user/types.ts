type Join = {
  username: string;
  password: string;
  nickname: string;
};

type User = {
  username: string;
  password?: string;
  nickname: string;
};

type Login = {
  username: string;
  password: string;
};

export { Join, Login, User };
