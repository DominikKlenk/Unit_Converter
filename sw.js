let sw_new;

/* Fügt dem Update Button ein "click" Event hinzu, welches, sobald der Button gedrückt wird,
eine postMessage() an den Service Worker sendet, welche im Falle eines Updates skipWaiting()
ausführt. 
Auserdem wird die "notification" nach einem Update wieder "leer" gesetzt.
*/
document.getElementById('Update_Button').addEventListener('click', function(){
  sw_new.postMessage({ action: 'skipWaiting' });
  document.getElementById("notification").innerHTML = "";
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
    reg.addEventListener('updatefound', function() {
      sw_new = reg.installing;
      /* Sobald eine Änderung am Service Worker vorgenommen wurde wird die "notification" auf
      "Neues Update verfügbar!" gesetzt und signalisiert, dass ein neues Update verfügbar ist.
      */
      if(reg.active){
        document.getElementById("notification").innerHTML = "Neues Update verfügbar!";
      }
    });
  });    
}