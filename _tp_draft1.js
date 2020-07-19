var rowNumber = 2;

(function(window, document, undefined){
    window.onload = init;
    function init(){
        var pp = document.getElementById("poslednjaPromena");
        pp.innerHTML = getDate();
    }


})(window, document, undefined);

function getDate() {
    var result = " "
    var date = new Date().toString();
    for (var i = 0; i < 24; i++) {
        result += date[i];
}
return "Poslednji put azurirano: " + result;
}

function preventEPlusMinus() {
    var inputBox = document.getElementById("cenaPolje");

    var invalidChars = [
    "-",
    "+",
    "e",
    ];

    inputBox.addEventListener("keydown", function(e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});
}

function promeniPreview(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("previewImage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);

} 

function promenaCene(){
    var cena = document.getElementById("cenaPolje");

    var pdv = document.getElementById("pdvPolje");
    pdv.value = Number(Math.round((cena.value) * 1.2+'e2')+'e-2');
}

function dodajArtikl(){

    var barkod = document.getElementById("barkodPolje");
    var naziv = document.getElementById("nazivPolje");
    var cena = document.getElementById("cenaPolje");
    if (barkod.value == "" || naziv == "" || cena == "") {
        alert("barkod, naziv, i cena su obavezni");
        return;
    } //mala optimizacija, da ne bismo ucitavali sve ako su ova tri prazna
    var table = document.getElementById("onlyTable");
    var opis = document.getElementById("opisPolje");
    var vrsta = document.getElementById("vrstaSelect");
    var pdv = document.getElementById("pdvPolje");
    var slikaIzbornik = document.getElementById("file-upload");
    var unesi = document.getElementById("unesiDugme");
    var preview = document.getElementById("previewImage");

    var row = table.insertRow(rowNumber++);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell1.innerHTML = barkod.value;
    cell2.innerHTML = naziv.value;
    cell3.innerHTML = opis.value;
    cell4.innerHTML = vrsta.value;
    cell5.innerHTML = cena.value;
    cell6.innerHTML = pdv.value;
    cell7.innerHTML = "<img src=\""+preview.src+"\">";

    var pp = document.getElementById("poslednjaPromena");
        pp.innerHTML = getDate();
}


function filtriraj() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("pretraga");
  filter = input.value.toUpperCase();
  table = document.getElementById("onlyTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 2; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
