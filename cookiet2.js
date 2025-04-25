const loginEmail = document.querySelector("#loginEmail");
const password = document.querySelector("#password");
const submitbtn = document.querySelector("#submitbtn");
const huskmig = document.querySelector("#huskmig");


//function myFunction() {
    // Get the checkbox
    //let //checkBox = document.getElementById("huskmig");
    // Get the output text
    //let text = document.getElementById("text");

    // If the checkbox is checked, display the output text
  //if (checkBox.checked == true){
    //text.style.display = "block";
  //} else {
    //text.style.display = "none";
  //



submitbtn.addEventListener("click", () => {
    if (huskmig.checked) {
    setCookie("loginmail", loginEmail.value, 365);
    setCookie("password", password.value, 365);
    } else {
    deleteCookie("loginmail");
    deleteCookie("password");
}
});

cookiebutton.addEventListener("click", () => {
    loginEmail.value = getCookie("loginmail");
    password.value = getCookie("password");
});

window.addEventListener("load", () => {
    const savedEmail = getCookie("loginmail");
    const savedPassword = getCookie("password");

    if (savedEmail && savedPassword) {
        loginEmail.value = savedEmail;
        password.value = savedPassword;
        huskmig.checked = true; // Automatically check "Remember Me" if cookies exist
    }
});

function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}
function deleteCookie(name){
    setCookie(name, null, null);
}
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
}