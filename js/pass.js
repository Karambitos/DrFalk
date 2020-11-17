"use strict";
$(document).ready(() => {
  /*
  Password
  */

  // localStorage.clear();

  let truePass = ['admin', 'admin']
  const nameField = document.querySelector('input[name="user_name"]');
  const passwordField = document.querySelector('input[name="user_password"]');
  const enterBtn = document.getElementById('submit');

  nameField.addEventListener("keyup", checkParams);
  passwordField.addEventListener("keyup", checkParams);

  function checkParams() {
    if (nameField.value === truePass[0] && passwordField.value === truePass[1]) {
      enterBtn.classList.remove('disabled');
      return;
    } else {
      enterBtn.classList.add('disabled');
      return;
    }
  }

  enterBtn.addEventListener("click", (event) => {
    if (enterBtn.classList.contains('disabled')) {
      event.preventDefault();
      return
    } else {
      event.preventDefault();
      window.location.href += "stream.html";
      localStorage.setItem('key', 'true');
      return
    }
  });
});