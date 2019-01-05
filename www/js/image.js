(function(){
  var bareObj = Object.create(null);
  Object.defineProperty(bareObj, {
    'key': {
    value: 'value',
    enumerable: false,
    configurable: true,
    writable: true
  }
});
console.log(bareObj);
})();

/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  document.getElementById('cameraTakePicture').addEventListener('click', cameraTakePicture);
}

function cameraTakePicture(){
  navigator.camera.getPicture(onSuccess, onFail, {
    quality:75,
    destinationType: Camera.DestinationType.FILE_URI
  });

  function onSuccess(){
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(){
    alert("Failed to load because this shit happened" + message);
  }
}*/
