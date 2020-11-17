"use strict";
$(document).ready(() => {

  const firstnameField = document.querySelector('input[name="firs_name"]');
  const lastnameField = document.querySelector('input[name="last_name"]');
  const acceptBtn = document.getElementById('accept');

  firstnameField.addEventListener("keyup", checkParams);
  lastnameField.addEventListener("keyup", checkParams);

  function checkParams() {
    if (firstnameField.value != "" && lastnameField.value != "") {
      acceptBtn.classList.remove('disabled');
      return;
    } else {
      acceptBtn.classList.add('disabled');
      return;
    }
  }
  function sendData(btn){

        let data = {data : {'firs_name': firstnameField.value, 'last_name' : lastnameField.value, 'url' : window.location.href, "time" : new Date()}};

        console.log(data);
        $.ajax({
            method: 'POST',
            url: 'form.php',
            data: data
        }).done(function( msg ){
            console.log( msg );
        });
      window.location.href = "thanks.html";

  }
  acceptBtn.addEventListener("click", (event) => {
    if (acceptBtn.classList.contains('disabled')) {
      event.preventDefault();
      return
    } else {
      event.preventDefault();
      sendData();
      return
    }
  });
});