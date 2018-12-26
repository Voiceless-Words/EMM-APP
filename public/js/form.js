(function() {
   var button=document.getElementById("add-cable");
   button.addEventListener('click', function(event) {
      event.preventDefault();
      var cln = document.getElementsById("cable")[0].cloneNode(true);
      document.getElementById("cables").insertBefore(cln,this);
      return false;
   });
})();
