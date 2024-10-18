export interface User {
  username: string;
  email: string;
  password: string;
  first_joined: string;
  last_login: string;
  characters: string[];
  campaigns?: string[];
}