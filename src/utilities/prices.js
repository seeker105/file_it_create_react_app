// Return an integer representing the monthly cost of the given accountType
export const getPlanPrice = (accountType) => {
  switch (accountType) {
    case "0":
      return 0;
    case "1":
      return 5;
    case "2":
      return 50;
    default:
      return 100;
  }
}
