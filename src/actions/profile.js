
export const storeUserData = (firstName, lastName, email) => {
  return {
    type: 'STORE_USER_DATA',
    firstName,
    lastName,
    email
  }
}
