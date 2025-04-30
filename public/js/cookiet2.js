
  const loginEmail = document.querySelector("#loginEmail");
  const password = document.querySelector("#password");
  const submitbtn = document.querySelector("#submitbtn");
  const huskmig = document.querySelector("#huskmig");

  
//Submit button handler, if checked stores info, if not deletes.
submitbtn.addEventListener("click", () => {
    if (huskmig.checked) {
    setCookie("loginmail", loginEmail.value);
    setCookie("password", password.value);
    } else {
    deleteCookie("loginmail");
    deleteCookie("password");
}
});


//When page loads retreive saved info, 
window.addEventListener("load", () => {
    const savedEmail = getCookie("loginmail");
    const savedPassword = getCookie("password");

//Auto fill the saved info if saved cookies exist.
    if (savedEmail && savedPassword) {
        loginEmail.value = savedEmail;
        password.value = savedPassword;
        huskmig.checked = true;   
    }
});

//cookie settings and expiration time.
 function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`
} 

//Delete cookie function, sets expiration date to a past date.
function deleteCookie(name){
    document.cookie = `${name}=; expires=Thu, 11 Sep 2001 00:00:00 UTC; path=/;`;
};

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

console.log(getCookie("password"));