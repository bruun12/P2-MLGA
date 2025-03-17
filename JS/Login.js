const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const repeatPassword = document.getElementById('repeatPassword');
const error_message = document.getElementById('error_message');


form.addEventListener('submit', (e) => {
    let errors = [];
    if (firstname){
      errors = getSignupErrors(firstname.value, email.value, username.value, password.value, repeatPassword.value);
    }
    else {
      errors = getLoginFormErrors(username.value, password.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(', ');
    } else {
        if (firstname) {
            saveUserProfile(firstname.value, lastname.value, email.value, username.value, password.value);
        }
    }
});

let saveFile = () => {
    const firstname = document.getElementById('firstname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let data = "\r Firstname: " + firstname.value + " , Email: " + email.value + " , Password: " + password.value;
    console.log
    let textToBLOB = new Blob([data], { type: 'text/plain' });
    var filename = new Date();
    var mouth = new Date();
    
    var year = new Date();
    var year = year.getUTCFullYear();

    newdate = year + "/" + mouth.getMonth() + "/" + filename.getDate();
    const sFileName = filename;

    let newLink = document.createElement("a");
    newLink.download = new Data();

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
};




function getSignupErrors(firstname, email, username, password, repeatPassword) {
    let errors = [];
    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required');
        firstname.parentElement.classList.add('incorrect');
    }
    if (email === '' || email == null) {
        errors.push('Email is required');
        email.parentElement.classList.add('incorrect');
    }
    if (username === '' || username == null) {
        errors.push('Username is required');
        username.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password.parentElement.classList.add('incorrect');
    }
    if (repeatPassword === '' || repeatPassword == null) {
        errors.push('Repeat password is required');
        repeatPassword.parentElement.classList.add('incorrect');
    }
    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        password.parentElement.classList.add('incorrect');
        repeatPassword.parentElement.classList.add('incorrect');
    }
    return errors;
}

function getLoginFormErrors(username, password) {
    let errors = [];
    if (username === '' || username == null) {
        errors.push('Username is required');
        username.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password.parentElement.classList.add('incorrect');
    }
    return errors;
}

const allInputs = [firstname, email, username, password, repeatPassword];
allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
      }
    });
});



//
//document.querySelector("form").addEventListener("submit", function(event) {
    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;
  
    //if (username === "" || password === "") {
      //alert("Please enter both username and password");
      //event.preventDefault();
    //}
 // });

  //Lille test funktion
  //window.attempt = 4;
  //function validate(){
    //    if (username === "ElskerNorskeMænd" && password === "12345678") {
      //      alert("Login succesfully");
        //    window.location = "Brugerprofil.html"; // Dette skal ændres når de andre sider er færdige
          //  return false;
       // } else {
         //   window.attempt--;
           // alert("Du har kun " + window.attempt + "forsøg tilbage")
            //if (attempt === 0) {
            //document.getElementById("username").disabled = true;
            //document.getElementById("password").disabled = true; 
            //document.getElementById("login").disabled = true;
           // return false;
           // } 
      //  }
   // };
//