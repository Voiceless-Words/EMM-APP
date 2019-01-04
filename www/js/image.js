document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  document.getElementById('cameraTakePicture').addEventListener('click', cameraTakePicture);
}

function cameraTakePicture(){
  navigator.camera.getPicture(onSuccess, onFail, {
    quality:75,
    destinationType: Camera.DestinationType.DATA_URL
  });

  function onSuccess(){
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(){
    alert("Failed to load because this shit happened" + message);
  }
}
