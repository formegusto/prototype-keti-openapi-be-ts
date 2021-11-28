type Join = {
  username: string;
  password: string;
};

type User = {
  username: string;
  password?: string;
};

type Login = {
  username: string;
  password: string;
};

export { Join, Login, User };
