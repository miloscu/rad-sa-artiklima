var rowNumber = 0;
var slikaOdabrana = false;
const putanjaDoPrazneSlike = "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";

(function(window, document, undefined){
    window.onload = init;
    function init(){
        setRedIf();
        preventEPlusMinus();
    }


})(window, document, undefined);

function unsetRed(a) {
    document.getElementById(a.id).style = "";
}

function setRed(a) {
    document.getElementById(a.id).style.border = "1px solid red";
}

function setRedIf() {
    var a = document.getElementById("barkodPolje");
    var b =  document.getElementById("nazivPolje");
    if (a.value == "") {
        setRed(a);
    } else {
        unsetRed(a);
    }
    if (b.value == "") {
        setRed(b);
    } else {
        unsetRed(b);
    }
}

function daLiJePrazno() {   

}

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
    var ib2 = document.getElementById("barkodPolje");

    var invalidChars = [
    "-",
    "+",
    "e",
    ".",
    ];

    inputBox.addEventListener("keydown", function(e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
    
});
    ib2.addEventListener("keydown", function(e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
    
});
}

function promeniPreview(event) {

    var preview = document.getElementById("previewImage");
    var slikaIzbornik = document.getElementById("file-upload");
    if (!((slikaIzbornik.value[slikaIzbornik.value.length-1] =="g" && slikaIzbornik.value[slikaIzbornik.value.length-2] == "n" && slikaIzbornik.value[slikaIzbornik.value.length-3] == "p") || 
      (slikaIzbornik.value[slikaIzbornik.value.length-1] =="G" && slikaIzbornik.value[slikaIzbornik.value.length-2] == "N" && slikaIzbornik.value[slikaIzbornik.value.length-3] == "P"))) {
        alert("dozvoljene su samo PNG Slike");
    slikaIzbornik.style.border = "1px solid red";
    return;
}
slikaIzbornik.style.border = "";
var selectedFile = event.target.files[0];
var reader = new FileReader();

var imgtag = document.getElementById("previewImage");
imgtag.title = selectedFile.name;

reader.onload = function(event) {
    imgtag.src = event.target.result;
};

reader.readAsDataURL(selectedFile);
slikaOdabrana = true;

} 

function promenaCene(){
    var cena = document.getElementById("cenaPolje");

    var pdv = document.getElementById("pdvPolje");
    pdv.value = Number(Math.round((cena.value) * 1.2+'e2')+'e-2');
}

function dodajArtikl(){

    var slikaIzbornik = document.getElementById("file-upload");
    var preview = document.getElementById("previewImage");
    if (!(slikaIzbornik.value == "") && (!((slikaIzbornik.value[slikaIzbornik.value.length-1] =="g" && slikaIzbornik.value[slikaIzbornik.value.length-2] == "n" && slikaIzbornik.value[slikaIzbornik.value.length-3] == "p") || 
      (slikaIzbornik.value[slikaIzbornik.value.length-1] =="G" && slikaIzbornik.value[slikaIzbornik.value.length-2] == "N" && slikaIzbornik.value[slikaIzbornik.value.length-3] == "P")))) {
        alert("dozvoljene su samo PNG Slike");
        
    return;
}
        
var barkod = document.getElementById("barkodPolje");
var naziv = document.getElementById("nazivPolje");
if (barkod.value == "" || naziv.value == "") {
    alert("barkod, naziv i vrsta su obavezni");
    return;
    } //mala optimizacija, da ne bismo ucitavali sve ako su ova dva prazna
    var cena = document.getElementById("cenaPolje");
    var table = document.getElementById("teloTabele");
    var opis = document.getElementById("opisPolje");
    var vrsta = document.getElementById("vrstaSelect");
    var pdv = document.getElementById("pdvPolje");
    var slikaIzbornik = document.getElementById("file-upload");
    var unesi = document.getElementById("unesiDugme");
    

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
    var putanja = slikaOdabrana ? preview.src : putanjaDoPrazneSlike;
    cell7.innerHTML = "<img src=\"" + putanja + "\">";

    var pp = document.getElementById("poslednjaPromena");
    pp.innerHTML = getDate();

    barkod.value = "";
    naziv.value = "";
    cena.value = "";
    opis.value = "";
    pdv.value = "";

    slikaOdabrana = false;
    slikaIzbornik.value = '';

    preview.src = putanjaDoPrazneSlike;

    setRedIf();

    var data = document.getElementById("cars");
    data.innerHTML += "<option>" + vrstaSelect.value + "</option>";
    vrstaSelect.value = "";

}


function filtriraj() {
  
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("pretraga");
  filter = input.value.toUpperCase();
  table = document.getElementById("onlyTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
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
