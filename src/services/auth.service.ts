// services/auth.service.ts

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  console.log('login payload', payload);
};

export const resetPassword = async (payload: {
  newPassword: string;
  confirmPassword: string;
}) => {
  console.log('reset Password payload', payload);
};
