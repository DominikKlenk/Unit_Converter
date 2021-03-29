/* Array Definition zum füllen der <select> Boxen mit Kategorie und Einheiten.
Array Definition zum speichern der Umrechnungsfaktoren.
*/
var kategorie = new Array();
var einheit = new Array();
var faktor = new Array();

/* Festlegen der Kategorie sowie der passenden Einheiten mit ihren jeweiligen Umrechnungsfaktoren.

Der Umrechnungsfaktor ist jeweils die Einheit umgerechnet in Kilogramm (Gewicht), Meter(Laenge), 
Byte(Datenspeicher) und Sekunde(Zeit). --> Bsp.: 1cm = 0.01m, 1km = 1000m usw..
*/
kategorie[0] = "Gewicht";
einheit[0] = new Array("Kilogramm","Gramm", "Milligramm","Tonne","Pfund"); 
faktor[0] = new Array(1, 0.001, 1e-6, 1000,0.4535924);

kategorie[1] = "Laenge";
einheit[1] = new Array("Meter", "Zentimeter", "Milimeter","Kilometer","Meile");
faktor[1] = new Array(1,0.01,0.001,1000,1852);

kategorie[2] = "Datenspeicher";
einheit[2] = new Array("Byte","Bit", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte");
faktor[2] = new Array(1,0.125,1000,1e+6,1e+9,1e+12);

kategorie[3] = "Zeit";
einheit[3] = new Array("Sekunde", "Milisekunde", "Minute", "Stunde");
faktor[3] = new Array(1,0.001,60,3600);

/* Sorgt dafür, dass die jeweiligen <select> Boxen lediglich mit den Einheiten der ausgewählten 
Kategorie gefüllt sind.

removeOptions() leert die <select> Box und
fillOptions() hingegen füllt die <select> Box mit Einheiten der ausgewählten Kategorie.
*/
function removeOptions(selectbox){ 
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--) {
        selectbox.remove(i);
    }
}

function fillOptions(einheit) {
    removeOptions(document.getElementById("Einheit-Eingabe"));
    var select_eing = document.getElementById("Einheit-Eingabe");
    for(var i =0;i<einheit.length;i++) {
        select_eing.options[select_eing.options.length] = new Option(einheit[i], i);
    }
    removeOptions(document.getElementById("Einheit-Ausgabe"));
    var select_ausg = document.getElementById("Einheit-Ausgabe");
    for(var i =0;i<einheit.length;i++) {
        select_ausg.options[select_ausg.options.length] = new Option(einheit[i],i);
    }
}

/* Setzt die <select> Boxen anfangs auf die Katgeorie "Gewicht".
*/
fillOptions(einheit[0]);

/* Füllt die <select> Box mit den Kategorien.
*/
var select_kat = document.getElementById("Kategorie");
for(var i =0;i<kategorie.length;i++) {
    select_kat.options[select_kat.options.length] = new Option(kategorie[i],i);
}

/* Die validate() Funktion definiert die korrekte Eingabe mittels einer regular expression
und legt somit fest, dass lediglich Zahlen und ein Punkt verwendet werden darf.
*/ 
function validate(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

/* Die Funktionen updateAusgabe() und updateEingabe() wird ausgeführt, sobald im <input> Feld 
eine Änderung vorgenommen wird.

Die Funktionen rufen hierbei zuerst die validate() Funktion auf und prüfen die Eingabe
auf ihre Richtigkeit. 
Daraufhin wird die Eingabe in einen Float Wert umgewandelt und mit dem jeweiligen Faktor der
ausgewählten Einheit in die Zieleinheit umgewandelt und das Ergebnis in das entsprechende zweite 
<input> Feld eingetragen.
*/
function updateAusgabe(){    
    var test = validate(document.getElementById('Eingabe1').value);
        var inputField = document.getElementById('Eingabe1').value;
        
        /* test entspricht dem Rückgabe Wert der validate() Funktion, ist dieser == "null" ist die
        Eingabe falsch und wird dementsprechend korrigiert, indem der letzte Wert des Strings wieder
        entfernt wird.
        */
        if(test === null){
            var inputFieldAusgabe;
            var lengthInput = (document.getElementById('Eingabe1').value).length;
            inputFieldAusgabe = inputField.slice(0,lengthInput-1);
            document.getElementById('Eingabe1').value = inputFieldAusgabe;
            test=inputFieldAusgabe;
        } 

    var n1 = parseFloat(test);   

    /* Falls das <input> Feld leer ist wird anstelle von "NaN" eine "0" in das jeweilige Feld eingetragen.
    */
    if(isNaN(n1)){
        n1=0;
    }
    var zwischenErg = n1 * faktor[(document.getElementById("Kategorie")).value][(document.getElementById("Einheit-Eingabe")).value];
    var erg = zwischenErg / faktor[(document.getElementById("Kategorie")).value][(document.getElementById("Einheit-Ausgabe")).value];
    var n2 = document.getElementById('Eingabe2').value = erg;
}

function updateEingabe(){

    var test = validate(document.getElementById('Eingabe2').value);
        var inputField = document.getElementById('Eingabe2').value;
        
        if(test === null){
            var inputFieldAusgabe;
            var lengthInput = (document.getElementById('Eingabe2').value).length;
            inputFieldAusgabe = inputField.slice(0,lengthInput-1);
            document.getElementById('Eingabe2').value = inputFieldAusgabe;
            test=inputFieldAusgabe;
        }  

    var n2 = parseFloat(test);

    if(isNaN(n2)){
        n2=0;
    }
    var zwischenErg = n2 * faktor[(document.getElementById("Kategorie")).value][(document.getElementById("Einheit-Ausgabe")).value];
    var erg = zwischenErg / faktor[(document.getElementById("Kategorie")).value][(document.getElementById("Einheit-Eingabe")).value];
    var n1 = document.getElementById('Eingabe1').value = erg;
}

/* Sobald in der <select> Box mit den Kategorien die Kategorie geändert wird, wird die Funktion fillKategorie()
aufgerufen. Diese ruft die Funktion fillOptions() auf, welche entsprechend der ausgewählten Kategorie, die 
<select> Box für Einheiten mit den jeweiligen Einheiten füllt.  
*/
function fillKategorie(kat){
    switch(kat.value){
        case "0": fillOptions(einheit[0]);
            break;
        case "1": fillOptions(einheit[1]);
            break;
        case "2": fillOptions(einheit[2]);     
            break;
        case "3": fillOptions(einheit[3]);
            break;
    }
}