const generatedPassword = function(totalLength, number, lowerCase, upperCase, special) {
  let passwordLength = Math.floor(Math.random() * (12 - 6) + 6);
  const numberList = '0123456789';
  const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChar = '!@#$%^&*+-'
  let letters = '';

  if (totalLength > 0) {
    passwordLength = totalLength;
  }

  if (number ===  'true') {
    letters += numberList;
  }

  if (lowerCase === 'true') {
    letters += lowerCaseList;
  }

  if (upperCase === 'true') {
    letters += upperCaseList;
  }

  if (special === 'true') {
    letters += specialChar;
  }

  if (letters.length === 0) {
    letters += lowerCaseList;
  }

  console.log(letters);
  let result = '';
  for (let i = 0; i < passwordLength; i++) {
    result += letters[(Math.floor(Math.random() * letters.length))];
  }
  letters = '';
  return result;
};
