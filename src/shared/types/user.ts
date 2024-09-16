export type User = {
  name: string;
  email: string;
  password: string;
};

export type AuthError = {
  isError: boolean;
  errorMessage: string;
};
