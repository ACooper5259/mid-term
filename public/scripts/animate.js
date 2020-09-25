$(document).ready(function () {
  const $form = $('#new-site-forms');
  $form.hide()

  function compose() {
    $form.slideToggle('slow');
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
