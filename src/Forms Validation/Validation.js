export const validation = (firstName, lastName, email, password) => {
  if (firstName.trim() === "") return false;
  if (lastName.trim() === "") return false;
  if (email.trim() === "") return false;
  if (password.trim() === "") return false;

  return true;
};

export const validatePassword = (password, confirmPassword) => {
  if (password.trim() !== confirmPassword.trim()) return false;

  return true;
};
