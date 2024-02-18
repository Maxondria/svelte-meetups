export const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isNotEmpty = (value) => value.trim().length > 0;

export const isMinLength = (value, minLength) => value.length >= minLength;

export const isMaxLength = (value, maxLength) => value.length <= maxLength;

export const isURL = (value) => {
  const urlPattern = new RegExp(
    `^(https?://)?` + // protocol
      `((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|` + // domain name and extension
      `((\\d{1,3}\\.){3}\\d{1,3}))` + // OR ip (v4) address
      `(\\:\\d+)?` + // port
      `(\/[-a-z\\d%_.~+()]*)*` + // path
      `(\\?[;&a-z\\d%_.~+=-]*)?` + // query string
      `(\\#[-a-z\\d_]*)?$`, // fragment locator
    "i"
  ); // making the pattern case-insensitive

  return urlPattern.test(value);
};
