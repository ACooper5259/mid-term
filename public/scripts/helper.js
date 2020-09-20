const generatedPassword = function(totalLength, number, lowerCase, upperCase) {
  let passwordLength = Math.floor(Math.random() * (12 - 6) + 6);
  const numberList = '0123456789';
  const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let letters = '';

  if (totalLength > 0) {
    passwordLength = totalLength;
  }

  if (number) {
    letters += numberList;
  }

  if (lowerCase) {
    letters += lowerCaseList;
  }

  if (upperCase) {
    letters += upperCaseList;
  }

  console.log('total length', passwordLength);
  console.log('what is in string', letters);

  let result = '';
  for (let i = 0; i < passwordLength; i++) {
    result += letters[(Math.floor(Math.random() * letters.length))];
  }

  console.log(result);
  return result;
};

generatedPassword(null, false, true, true);

module.exports = { generatedPassword };
