const registration=document.getElementById("registrationForm")
const fullNameInput=document.getElementById("fullName")
const passwordInput=document.getElementById("password")
const phoneNumberInput=document.getElementById("phoneNumber");
const emailInput=document.getElementById("email")
const countryInput=document.getElementById("country")
const currencyInput=document.getElementById("currency")
const fullNameError=document.getElementById("fullNameError")
const passwordError=document.getElementById("passwordError")
const phoneNumberError=document.getElementById("phoneNumberError")
const emailError=document.getElementById("emailError");

const countryCurrency = {
    Afghanistan: "AFN",
    Armenia: "AMD",
    Australia: "AUD",
    Austria: "EUR",
    Bahrain: "BHD",
    Brazil: "BRL",
    Canada: "CAD",
    Egypt: "EGP",
    India: "INR",
    Kuwait: "KWD",
    Qatar: "QAR",
    SaudiArabia: "SAR",
    SouthAfrica: "ZAR",
    UAE: "AED",
    UK: "GBP",
    USA: "USD",
    Yemen: "YER"
};

function updateCurrency(){
    const selectedCountry=countryInput.value;
    currencyInput.value=countryCurrency[selectedCountry]||"";
    

}
function validateFullName(){

    if(fullNameInput.value.trim()===""){

        fullNameError.innerText="Full Name is required";

        return false;

    }

    const fullNamePattern=/^[A-Za-z ]{3,}$/;

    if(!fullNamePattern.test(fullNameInput.value.trim())){

        fullNameError.innerText="Name must contain at least 3 letters";

        return false;

    }

    fullNameError.innerText="";

    return true;

}
function validatePassword(){

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

    if(!passwordPattern.test(passwordInput.value)){

        passwordError.innerText = "Password must contain 6 characters, 1 letter, 1 number and 1 special character";

        return false;

    }

    passwordError.innerText = "";

    return true;

}

function  validatePhone(){
    const  phonePattern=/^\d+$/;
    if(!phonePattern.test(phoneNumberInput.value)){
        phoneNumberError.innerText="Phone Number must contain only digit"

        return false;
    }
    phoneNumberError.innerText=""
    return true;

}
function validateEmail(){
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailInput.value)){
        emailError.innerText="Please Enter Valid Email";
        return false;
    }
    emailError.innerText=""

    return true;
}

function validateForm(){
    const isFullName=validateFullName();
    const isPasswordValid=validatePassword();

    const isPhoneValid=validatePhone();
    const isEmailValid=validateEmail();

    return isFullName&&
    isPasswordValid&&
    isPhoneValid&&
    isEmailValid;
}