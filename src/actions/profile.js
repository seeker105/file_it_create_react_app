
export const storeUserData = (firstName, lastName, email) => {
  return {
    type: 'STORE_USER_DATA',
    firstName,
    lastName,
    email
  }
}

export const storeUserCredential = (credential) => {
  return {
    type: 'STORE_USER_CREDENTIAL',
    credential
  }
}
