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



  function focusRegister() {
    document.getElementById("name").focus();
  }
  const registerNav = document.getElementById("register-nav");
  $(registerNav).click(focusRegister)

  function focusLogin() {
    document.getElementById("email").focus();
  }
  const loginNav = document.getElementById("login-nav");
  $(loginNav).click(focusLogin)

});
