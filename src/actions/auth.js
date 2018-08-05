
export const loginGenerator = (firstName, lastName, email) => {
  return {
    type: 'LOGIN',
    firstName,
    lastName,
    email
  };
};

export const logoutGenerator = () => {
  return {
    type: 'LOGOUT'
  };
};
