"use strict"
// DAWA Autocomplete for adress search and chosen adress
dawaAutocomplete.dawaAutocomplete( document.getElementById("adresse"), {
  select: function(selected) {
    document.getElementById("valgtadresse").innerText= selected.tekst;
  }
});

console.log("hej");