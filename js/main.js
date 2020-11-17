"use strict";
$(document).ready(() => {

  checkStorage();

  function checkStorage() {
    const value = localStorage.getItem('key');
    if (value === null) {
      localStorage.setItem('key', 'false');
      window.location.replace('/');
      return
    }
  }

  /*
    Spiner
  */

  const spinner = document.querySelector(".spinner");
  const spinnerButton = document.querySelectorAll(".spinner-line");
  const spinerMenu = document.querySelector(".header__navigation");
  const menuItem = document.querySelectorAll(".menu-item");
  const overflowMenu = document.querySelector(".overflow-menu");

  const overflowHidden = () => {
    if (document.body.style.overflow === "") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const spinnerClassToggle = () => {
    spinerMenu.classList.toggle("active");
    spinnerButton.forEach((elem) => {
      elem.classList.toggle("active");
    });
  };
  overflowMenu.addEventListener("click", (event) => {
    event.preventDefault();
    spinnerClassToggle();
    overflowHidden();
  });

  spinner.addEventListener("click", (event) => {
    event.preventDefault();
    spinnerClassToggle();
    overflowHidden();
  });

  menuItem.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
        spinnerClassToggle();
      }
      return;
    });
  });

  $(window).resize(function () {
    if (window.innerWidth > 768 &&
      document.body.style.overflow === "hidden" &&
      (spinerMenu.className === 'header__navigation active')) {
      spinnerClassToggle();
      overflowHidden();
    }
  });
  /*
    videoPopUp
  */
  const videoPopUpBTN = document.querySelectorAll(".video-popup--open");
  const videoPopUp = document.querySelectorAll(".video-popup");
  const videoPopClose = document.querySelectorAll(".video-popup--close");
  videoPopUpBTN.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault();
      let attr = elem.closest("div[data-filter]");
      let atrValue = attr.dataset.filter;
      videoPopUp.forEach((elem) => {
        if (elem.dataset.category === atrValue) {
          document.body.classList.add("active");
          elem.classList.add("active");
        }
      });
    });
    videoPopClose.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        let videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
        })
        let attr = elem.closest("section[data-category]");
        attr.classList.remove("active");
        document.body.classList.remove("active");
      });
    });
  });
  /*
    close video in iframe
  */
  $('.video-popup--close').click(function (el) {
    var target = $(this).closest('section[data-category]').find('iframe');
    target.attr('src', target.attr('src'));
  });

  /*
    Filter
  */
  $("button[dw-filter]").click(function () {
    var t = $(this).attr("dw-filter");
    console.log(t);
    $("button[dw-filter]").removeClass("btn-active");
    $(this).addClass("btn-active");
    $.each($("div.items[dw-category]"), function (index, value) {
      if (!$(this).attr("dw-category").match(new RegExp(t))) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});