"use strict";
$(document).ready(() => {
  // * TIMER setings

  // * start first stream
  let endtime = "october 02 2020, 08:30 GMT+0200";
  // * end first stream
  let endtimeStream = "october 02 2020, 11:00 GMT+0200";
  // * start second stream
  let endtime2 = "october 02 2020, 15:00 GMT+0200";

  let nowdate = Date.now();
  let checkTime = function () {
    if (!(nowdate <= Date.parse(endtimeStream))) {
      endtime = endtime2;
    }
  };
  checkTime();

  // changing the format 3:4:5 => 03:04:05
  function makeCorrectDate(uncorrectDate) {
    let correctDate = uncorrectDate;
    if (uncorrectDate < 10) {
      correctDate = "0" + uncorrectDate;
    }
    return correctDate.toString();
  }

  // how much time is left
  function getDateRemaining(timesup) {
    // total = time is left
    var total = Date.parse(timesup) - Date.now();
    var seconds = Math.floor((total / 1000) % 60);
    var minutes = Math.floor((total / 1000 / 60) % 60);
    var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    var days = Math.floor(total / (1000 * 60 * 60 * 24));
    // console.log(total);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setTime(id, timesup) {
    let streamBox = document.querySelector(".stream-box");
    let timer = document.getElementById(id),
      days = timer.querySelector(".days"),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds");

    // timer update every 1000ms
    const intId = setInterval(update, 1000);
    intId();

    function update() {
      let total = getDateRemaining(timesup);
      var nowdate = Date.now();
      if (nowdate <= Date.parse(endtime)) {
        days.textContent = makeCorrectDate(total.days);
        hours.textContent = makeCorrectDate(total.hours);
        minutes.textContent = makeCorrectDate(total.minutes);
        seconds.textContent = makeCorrectDate(total.seconds);
      } else {
        days.textContent = 0;
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
        streamBox.classList.add("active");
        clearInterval(intId);
        newStream();
      }
    }
  }
  setTime("timer", endtime);

  function newStream() {
    const vd = document.getElementById(
      "sdnPlayer_ZhqkWcrPDRdzQCB-player-source-container"
    );
    vd.addEventListener("ended", () => {
      endtime = endtime2;
      document.querySelector(".stream-box").classList.remove("active");
      setTime("timer", endtime);
    });
  }
});