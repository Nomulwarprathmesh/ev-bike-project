export const authValidation = {
  email: {
    required: "Email is required",
    pattern: /^\S+@\S+\.\S+$/,
  },
  password: {
    required: "Password is required",
    minLength: 8,
  },
};
