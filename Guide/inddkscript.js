"use strict"
dawaAutocomplete.dawaAutocomplete( document.getElementById("adresse"), {
  select: function(selected) {
    document.getElementById("valgtadresse").innerHTML= selected.tekst;
  }
});