const isThreeChars = (input) => {
  return input.trim().length >= 3;
};

const isEmail = (input) => {
  const isValid =
    input.trim().length > 0 &&
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input.trim());
  return isValid;
};

const isSixChars = (input) => {
  return input.trim().length >= 6;
};

export { isThreeChars, isEmail, isSixChars };
