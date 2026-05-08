export type AppRole = "admin" | "vendor" | "user" | "super_admin";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignupInput = AuthCredentials & {
  name?: string;
  role?: AppRole;
};
