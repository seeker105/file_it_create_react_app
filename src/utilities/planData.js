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

export const getPlanDetails = (accountType) => {
  switch (accountType) {
    case "0":
      return "Free Plan. 5GB";
    case "1":
      return "Personal. 10GB";
    case "2":
      return "Business. 50GB";
    default:
      return "Premium. 100GB";
  }
}
