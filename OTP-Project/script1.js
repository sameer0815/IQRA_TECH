// ==============================
// Selecting Elements
// ==============================

const otpInputs = document.querySelectorAll(".otp-input");

const generateBtn = document.getElementById("generateBtn");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");

const timer = document.getElementById("timer");
const attempts = document.getElementById("attempts");
const status = document.getElementById("status");


// ==============================
// Variables
// ==============================

let generatedOTP = "";
let timeLeft = 30;
let interval;
let chance = 3;


// ==============================
// Generate OTP
// ==============================

generateBtn.addEventListener("click", generateOTP);

function generateOTP(){

    clearInterval(interval);

    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

    alert("Your OTP : " + generatedOTP);

    timeLeft = 30;

    chance = 3;

    attempts.innerText = chance;

    status.innerText = "";

    resendBtn.disabled = true;

    verifyBtn.disabled = false;

    otpInputs.forEach((input)=>{

        input.value="";

    });

    otpInputs[0].focus();

    startTimer();

}



// ==============================
// Timer
// ==============================

function startTimer(){

    timer.innerText = `Time Remaining : ${timeLeft} sec`;

    interval = setInterval(()=>{

        timeLeft--;

        timer.innerText = `Time Remaining : ${timeLeft} sec`;

        if(timeLeft<=0){

            clearInterval(interval);

            timer.innerText="OTP Expired";

            status.style.color="red";

            status.innerText="OTP Expired. Please Generate Again.";

            verifyBtn.disabled=true;

            resendBtn.disabled=false;

        }

    },1000);

}



// ==============================
// Verify OTP
// ==============================

verifyBtn.addEventListener("click", verifyOTP);

function verifyOTP(){

    let enteredOTP="";

    otpInputs.forEach((input)=>{

        enteredOTP += input.value;

    });

    if(enteredOTP.length!=4){

        status.style.color="red";

        status.innerText="Enter Complete OTP";

        return;

    }

    if(enteredOTP===generatedOTP){

        clearInterval(interval);

        status.style.color="green";

        status.innerText="✅ OTP Verified Successfully";

        verifyBtn.disabled=true;

        resendBtn.disabled=true;

    }

    else{

        chance--;

        attempts.innerText=chance;

        status.style.color="red";

        status.innerText="❌ Incorrect OTP";

        otpInputs.forEach((input)=>{

            input.value="";

        });

        otpInputs[0].focus();

        if(chance===0){

            clearInterval(interval);

            verifyBtn.disabled=true;

            resendBtn.disabled=false;

            status.innerText="Too Many Attempts. Generate New OTP.";

        }

    }

}



// ==============================
// Resend OTP
// ==============================

resendBtn.addEventListener("click", generateOTP);



// ==============================
// Auto Focus
// ==============================

otpInputs.forEach((input,index)=>{

    input.addEventListener("input",(e)=>{

        input.value=input.value.replace(/[^0-9]/g,"");

        if(input.value && index<otpInputs.length-1){

            otpInputs[index+1].focus();

        }

    });

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Backspace" && input.value==="" && index>0){

            otpInputs[index-1].focus();

        }

    });

});



// ==============================
// Paste OTP
// ==============================

otpInputs[0].addEventListener("paste",(e)=>{

    e.preventDefault();

    const data=e.clipboardData.getData("text");

    if(/^\d{4}$/.test(data)){

        data.split("").forEach((num,index)=>{

            otpInputs[index].value=num;

        });

        otpInputs[3].focus();

    }

});