
export const storeUserData = (firstName, lastName, email, accountType) => {
  return {
    type: 'STORE_USER_DATA',
    firstName,
    lastName,
    email,
    accountType
  }
}

export const storeUserCredential = (credential) => {
  return {
    type: 'STORE_USER_CREDENTIAL',
    credential
  }
}

export const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    email
  }
}
