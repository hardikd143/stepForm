$(document).ready(function () {
  $("#inpProfileImg").on("input", function () {
    let filePath = $(this).val();
    console.log(filePath);
  });

  // toggle password visibility
  $("label.hidelabel").click(function () {
    let hide = $("#togglepass")[0].checked;
    if (hide == false) {
      $("#password").attr("type", "text");
      $("#password").css("color", "white");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(this).css("color", "white");
    } else {
      $("#password").attr("type", "password");
      $("#password").css("color", "var(--grey)");
      $(this).css("color", "var(--grey)");
      $(this).addClass("fa-eye").removeClass("fa-eye-slash");
    }
  });

  //   removing placeholders in smaller devices
  let wid = window.outerWidth;
  if (wid < 400) {
    let inputs = $("input[placeholder]");
    for (let i = 0; i < inputs.length; i++) {
      let inp = inputs[i];
      $(inp).removeAttr("placeholder");
    }
  }
  //   for step tite
  function stepTitle(step) {
    // getting all title and making them hide
    let titles = $(".steps-title h5");
    for (let i = 0; i < titles.length; i++) {
      let title = titles[i];
      $(title).css("display", "none");
    }
    // show the active title by current step
    let activeTitle = $(`h5.step-${step}-title`);
    $(activeTitle).css("display", "block");
  }
  // for steps progress
  function stepProg(step) {
    // calculating  length in percentage according to current step
    let barLen = (step / 3) * 100;
    // for showing only 2 decimal points in float
    let length = parseFloat(barLen).toFixed(2);
    $(".finished").css("width", `${length}%`);
    $(".finishedNum").text(parseInt(barLen) + "%");
  }
  // for steps content
  function stepContent(step) {
    // getting all step-content and making them hide
    let stepcontent = $(".stepContent");
    for (let i = 0; i < stepcontent.length; i++) {
      let cont = stepcontent[i];
      $(stepcontent).css("display", "none");
    }
    // show the active step-content by current step
    let activeCont = $(`.step_${step}`);
    $(activeCont).css("display", "block");
  }
  // step btn
  $(".step-btn").click(function () {
    // making prev btn visible
    $(".prev-btn").css("display", "inline-block");
    // geting next step
    let stepNum = $(this).attr("data-tostep");

    // this is condition is for step number
    if (stepNum == 2) {
      $("#num2").prop("checked", true);
      $(".step2num").css({
        "transition-delay": "0.5s",
      });
    } else {
      $("#num3").prop("checked", true);
      $(".step2num").css({
        "transition-delay": "0s",
      });
      $(".step3num").css({
        "transition-delay": "0.5s",
      });
    }
    // changin prev btn tostep attr according to current step
    $(".prev-btn").attr("data-tostep", parseInt(stepNum) - 1);
    // number for current step
    $(".stepNum").text(stepNum);
    // getting current steptitle
    stepTitle(stepNum);
    // gettign current length of step-progress bar
    stepProg(stepNum);
    // getting current step-content
    stepContent(stepNum);
    // if next step is last makng step btn hidden
    if (stepNum == 3) {
      $(this).css("display", "none");
      return;
    }
    // changing tostep attr
    $(this).attr("data-tostep", parseInt(stepNum) + 1);
  });
  // previous btn
  $(".prev-btn").click(function () {
    // making prev btn visible
    $(".step-btn").css("display", "inline-block");
    // geting next step
    let prevNum = $(this).attr("data-tostep");
    // this is condition is for step number
    if (prevNum == 2) {
      $("#num2").prop("checked", true);
      $(".step2num").css({
        "transition-delay": "0.1s",
      });
      $(".step3num").css({
        "transition-delay": "0.1s",
      });
    } else {
      $("#num1").prop("checked", true);
    }
    // changin prev btn tostep attr according to current step
    $(".step-btn").attr("data-tostep", parseInt(prevNum) + 1);
    // number for current step
    $(".stepNum").text(prevNum);
    // getting current steptitle
    stepTitle(prevNum);
    // gettign current length of step-progress bar
    stepProg(prevNum);
    // getting current step-content
    stepContent(prevNum);
    // if next step is last makng step btn hidden
    if (prevNum == 1) {
      $(this).css("display", "none");
      return;
    }
    // changing tostep attr
    $(this).attr("data-tostep", parseInt(prevNum) - 1);
  });

  //   password validation
  $("#password").keyup(function (e) {
    // getting all values for validation
    let passValue = $(this).val();
    let passLength = passValue.length;
    let lower = /[a-z]/g;
    let upper = /[A-Z]/g;
    let nums = /[0-9]/g;
    let speChar = /[!@#$%^&*]/g;
    let strLevel = 0;
    if (e.which == 32) {
      let pass = passValue.slice(0, -1);
      $(this).val(pass);
      $(".blankspaceAlert").css("display", "flex");
      setTimeout(() => {
        $(".blankspaceAlert").css("display", "none");
      }, 2000);
    }
    // if val has upper letters
    if (passValue.match(upper)) {
      strLevel += 20;
      $(".upperValid").addClass("valid");
    } else {
      $(".upperValid").removeClass("valid");
    }
    // if val has upper letters
    if (passValue.match(lower)) {
      strLevel += 20;
      $(".lowerValid").addClass("valid");
    } else {
      $(".lowerValid").removeClass("valid");
    }

    // if val has special characters
    if (passValue.match(speChar)) {
      strLevel += 20;
      $(".speCharValid").addClass("valid");
    } else {
      $(".speCharValid").removeClass("valid");
    }

    // if val has numbers
    if (passValue.match(nums)) {
      strLevel += 20;
      $(".numValid").addClass("valid");
    } else {
      $(".numValid").removeClass("valid");
    }
    // if val length = 8
    if (passLength >= 8) {
      strLevel += 20;
      $(".lenValid").addClass("valid");
    } else {
      $(".lenValid").removeClass("valid");
    }

    if (strLevel == 100) {
      $(".step-btn").prop("disabled", false);
      $(".step-btn").css({ opacity: "1", cursor: "unset" });
    } else {
      $(".step-btn").prop("disabled", true);
      $(".step-btn").css({ opacity: "0.5", cursor: "not-allowed" });
    }

    $(".strength-Level").css("width", `${strLevel}%`);
    let text = $(".strengthText");
    switch (strLevel) {
      case 0:
        $(text).text(" ");
        break;
      case 20:
        $(".strength-Level").css("background", "#ff4646");
        $(text).text("weak");
        break;

      case 40:
        $(".strength-Level").css("background", "#ff9924");
        $(text).text("low");
        break;
      case 60:
        $(".strength-Level").css("background", "#f3ff46");
        $(text).text("medium");
        break;
      case 80:
        $(".strength-Level").css("background", "#8aff46");
        $(text).text("good");
        break;
      case 100:
        $(".strength-Level").css("background", "#48bb78");
        $(text).text("excellent");

        break;

      default:
        break;
    }
  });

  // close blank space pass alert
  $(".closespaceAlert").click(function () {
    let alert = $(this).parent();
    $(alert).css("display", "none");
  });
  $('input[name="stepnum"]').change(function () {
    let inp = $(this)[0];
    let id = $(inp).attr("id");
    let numBar = $(".stepnumbar");
  });
});
