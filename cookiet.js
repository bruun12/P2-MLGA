//document.cookie = "firstName=Tim; expires=Fri, 31 Dec 2030 23:59:59 GMT; path=/";
//document.cookie = "lastName=Fangel; expires=Fri, 31 Dec 2030 23:59:59 GMT; path=/";
//document.cookie = "username=Peter Bøsstrup; expires=Fri, 31 Dec 2030 23:59:59 GMT; path=/";

//console.log(document.cookie); // Output: firstName=Tim; lastName=Fangel; username=Peter Bøsstrup

setCookie("firstName", "Peter", 365);
setCookie("lastName", "Pedersen", 365);
//setCookie("email", "ejlavær@gpik.com", 365);

getCookie("firstName"); // Get the cookie with name "firstName"

//deleteCookie("firstName"); // Delete the cookie with name "firstName"
//deleteCookie("lastName"); // Delete the cookie with name "lastName"
//deleteCookie("email"); // Delete the cookie with name "username"
//deleteCookie("username"); // Delete the cookie with name "username"

console.log(document.cookie);

function setCookie(name, value, daysToLive){
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000)); // Set the expiration date
    let expires = "expires=" + date.toUTCString(); // Convert to UTC string format
    document.cookie = `${name}=${value}; ${expires}; path=/`; // Set the cookie with name, value, expiration date, and path
};

function deleteCookie(name){
    setCookie(name, null, null);
}

function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie); // Decode the cookie string
    const cArray = cDecoded.split("; "); // Split the string into individual cookies
    let result = null; // Declare and initialize result

    cArray.forEach(cookie => {
        if (typeof cookie === "string" && cookie.indexOf(name + "=") === 0) { // Check if the cookie starts with the name
            result = cookie.substring(name.length + 1); // Extract the cookie value
        }
    });

    return result; // Return the result
}