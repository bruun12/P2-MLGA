const hostname = '127.0.0.1';
const port = 3000;

// Den her gør, at knappen virker 
let listener = document.querySelector("#getter").addEventListener("click", makeGet);

let button = document.querySelector("#poster").addEventListener("click", makePost);

const fs = require('fs');


function makeGet(){
    //Her indlæser vi "databasen" i dette tilfælde en jason fil.
    fetch("../database/db.json")
    //Her omskriver vi det fra json til et array i js. Arrayet hedder "data" i næste function
    .then(response => {return response.json()})
    .then(data=>{
        //Vi løber igennem forløkken for alle 
        for (const i in data.employees) {
            console.log(data.employees[i]);

            //Vi klargøre "HTML", som vi placerer og udfylder senere. 
            //Table row
            let tableRow = document.createElement("tr");
            //table data
            let tableFN = document.createElement("td");
            let tableLN = document.createElement("td");

            //Vi sætter den her under html id'et table
            document.querySelector("#table").appendChild(tableRow);

            //de her bliver "børn" til table row
            tableRow.appendChild(tableFN);
            tableRow.appendChild(tableLN);
    
            tableFN.textContent = data.employees[i].firstName;
            tableLN.textContent = data.employees[i].lastName;
        }
        })
}


// Dette virker ikke, men jeg får den til det
function makePost(){
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;

    fetch("db.json",
        {
            method: "POST",
            body: data
        })

    .then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) 
        
    })


    console.log(myObject);



}