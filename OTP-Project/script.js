const otpInputs = document.querySelectorAll(".otp-input");
const generateBtn = document.getElementById("generateBtn");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const attempts = document.getElementById("attempts");

let generatedOTP = "";
let timeLeft = 30;
let interval;
let chance = 3;

//  const temp=generateBtn.addEventListener("click",generateOTP)

function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
  alert(generatedOTP);
  timeLeft = 30;
  chance = 3;
  attempts.innerText = chance;
  otpInputs.forEach((input) => {
    input.value = "";
  });

  otpInputs[0].focus();
  status.innerText = "";

  verifyBtn.disabled = false;

  resendBtn.disabled = true;
  startTimer();
}
function startTimer() {
  clearInterval(interval);
  timer.innerText = `Time Remaining :${timeLeft} sec`;

  interval = setInterval(() => {
    timeLeft--;
    timer.innerText = `Time Remaining ${timeLeft} sec`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.innerText = "OTP Expired";
      status.style.color = "red";
      status.innerText = "OTP Expired.Please Generate Again";
      otpInputs.forEach((input) => {
        input.value = "";
      });

      otpInputs[0].focus();
      verifyBtn.disabled = true;
      resendBtn.disabled = false;
    }
  }, 1000);
}
function verifyOTP() {
  let enterOTP = "";
  otpInputs.forEach((input) => {
    enterOTP += input.value;
  });
  if (enterOTP.length != 4) {
    status.style.color = "red";
    status.innerText = "Enter Complete OTP";

    return;
  }
  if (enterOTP === generatedOTP) {
    clearInterval(interval);
    status.style.color = "green";
    status.innerText = "OTP Verified Successfully";
    verifyBtn.disabled = true;
    resendBtn.disabled = true;
  } else {
    chance--;
    attempts.innerText = chance;
    status.style.color = "red";
    status.innerText = "Incorrect OTP";

    otpInputs.forEach((input) => {
      input.value = "";
    });
  }
  otpInputs[0].focus();

  if (chance === 0) {
    clearInterval(interval);
    verifyBtn.disabled = true;
    resendBtn.disabled = false;

    status.innerText = "Too Many Attempts. Generate New OTP";
  }
}
function resendOTP() {
  generateOTP();
}

function autoFocus() {
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
}

function pasteOTP() {
  otpInputs[0].addEventListener("paste", (e) => {
    e.preventDefault();

    const pastedOTP = e.clipboardData.getData("text").trim();

    if (pastedOTP.length === 4) {
      otpInputs.forEach((input, index) => {
        input.value = pastedOTP[index] || "";
      });
      otpInputs[3].focus();
    }
  });
}
generateBtn.addEventListener("click", generateOTP);

verifyBtn.addEventListener("click", verifyOTP);

resendBtn.addEventListener("click", resendOTP);

autoFocus();

pasteOTP();
