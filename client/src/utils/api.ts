export const getApiUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3003";
  } else {
    return "https://node11255.herokuapp.com";
  }
};
