const loginEmail = document.querySelector("#loginEmail");
const password = document.querySelector("#password");
const submitbtn = document.querySelector("#submitbtn");
const cookiebutton = document.querySelector("#cookiebutton");


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
    setCookie("firstName", firstText.value, 365);
    setCookie("lastName", lastText.value, 365);
});
cookiebutton.addEventListener("click", () => {
    firstText.value = getCookie("firstName");
    lastText.value = getCookie("lastName");
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