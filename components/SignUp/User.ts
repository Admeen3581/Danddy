export interface User {
  username: string;
  email: string;
  password: string;
  first_joined: string;
  last_login: string;
  characters: string[];
  campaigns?: string[];
}

export interface SignUpFormProps {
  onSubmit: (userData: User) => void;
  loading: boolean;
}