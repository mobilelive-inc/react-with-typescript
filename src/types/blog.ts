export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
}