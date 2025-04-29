
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

  const loginEmail = document.querySelector("#loginEmail");
  const password = document.querySelector("#password");
  const submitbtn = document.querySelector("#submitbtn");
  const huskmig = document.querySelector("#huskmig");
  
  
//Submit button handler, if checked stores info if not deletes.
submitbtn.addEventListener("click", () => {
    if (huskmig.checked) {
    setCookie("loginmail", loginEmail.value, 365);
    setCookie("password", password.value, 365);
    } else {
    deleteCookie("loginmail");
    deleteCookie("password");
}
});


const cookiebutton = document.querySelector("#cookiebutton");
cookiebutton.addEventListener("click", () => {
    loginEmail.value = getCookie("loginmail");
    password.value = getCookie("password");
});

//cookie settings and expiration time.
function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
}
function deleteCookie(name){
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 11 Sep 2001 00:00:00 UTC; path=/;`;
    }}
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