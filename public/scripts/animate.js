$(document).ready(function () {
  function compose() {
    const generatePassword = document.getElementById("new-site-forms");
    if (generatePassword.style.display === "block") {
      generatePassword.style.display = "none";
    } else {
      generatePassword.style.display = "block";
    }
  }



  const passwordButton = document.getElementsByClassName("password-form");
  $(passwordButton).click(compose);
});
