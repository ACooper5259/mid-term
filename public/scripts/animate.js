$(document).ready(function () {
  function compose() {
    const generatePassword = document.getElementById("generate-password");
    if (generatePassword.style.display === "none") {
      generatePassword.style.display = "block";
    } else {
      generatePassword.style.display = "none";
    }
  }

  const passwordButton = document.getElementsByClassName("password-form");
  $(passwordButton).click(compose);
});
