
export const loginGenerator = (firstName, lastName, email, accountType) => {
  return {
    type: 'LOGIN',
    firstName,
    lastName,
    email,
    accountType
  };
};

export const logoutGenerator = () => {
  return {
    type: 'LOGOUT'
  };
};
