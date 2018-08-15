export class MockUser {
  constructor(uid, displayName, lastName, email) {
    this.user = {
      uid,
      displayName,
      lastName,
      email
    };
  }

  updateProfile = ({...rest}) => {
    this.user = {
      ...this.user,
      ...rest
    }
  }
}

export const MockUserDefaults = {
  uid: "123",
  displayName: "Test",
  lastName: "User",
  email: "user1@gmail.com"
}

export default new MockUser(MockUserDefaults.uid,
                            MockUserDefaults.displayName,
                            MockUserDefaults.lastName,
                            MockUserDefaults.email
                          );
