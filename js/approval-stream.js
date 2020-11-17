$(function() {
  if (!$.cookie('approval')) {
      let modalView = '<div id="StreamApproval" class="modal-form">'+
       ' <div class="modal-content">'+
       ' <div class="modal-title">Legal Information</div>'+
            '<div class="modal-text">I confirm that I was personally invited to the event by Dr. Falk Pharma and that I will not make or distribute any recordings of the event.</div>'+
           ' <div class="modal-body">'+
               ' <form class="form form-stream" id="streamForm">'+
                   ' <div class="flex-row">'+
                     ' <input id="stream-firs_name" type="text" name="firs_name" placeholder="First name" required>'+
                      '<input id="stream-last_name" type="text" name="last_name" placeholder="Surname" required>'+
                   ' </div>'+
                    '<div class="flex-row-button">'+
                      '<button class="disabled" id="approve" type="submit">Approve</button>'+
                    '</div>'+
                '</form>'+
            '</div>'+
       ' </div>'+
    '</div>';

      $('.general-wrapper').hide(100);
      $.fancybox.open(modalView,{
          modal:true,
          clickSlide: "",
          clickOutside: "",
          opts : {
              afterShow : function( instance, current ) {
                  console.info( 'done!' );
              }
          }
      });

    }
})

$(document).ready(() => {

  const firstnameField = document.querySelector('input[name="firs_name"]');
  const lastnameField = document.querySelector('input[name="last_name"]');
  const acceptBtn = document.getElementById('approve');

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
            url: 'approval-stream.php',
            data: data
        }).done(function( msg ){
        });

  }
  acceptBtn.addEventListener("click", (event) => {
    if (acceptBtn.classList.contains('disabled')) {
      event.preventDefault();
      return
    } else {
      event.preventDefault();
      sendData();
      $('.general-wrapper').show(300);
      $.fancybox.close();
      $.cookie('approval', true, {
          expires: 30,
          path: '/stream.html'
      });
      return
    }
  });
});