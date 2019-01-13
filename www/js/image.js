
let app = {
    init: function(){
        document.getElementById('btn').addEventListener('click', app.takephoto);
    },
    takephoto: function(){
        let opts = {
            quality:  80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };
        navigator.camera.getPicture(app.success1, app.failure, opts);
    },
    success1: function(imgURI){
        document.getElementById('photo').src = imgURI;
        savePhoto();
    },
    failure: function(msg){
        document.getElementById('msg').textContent = msg;
    }
};
document.addEventListener('deviceready', app.init);

function savePhoto(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

    //console.log(this.responseText.users);
        console.log("done");
      }
    }
    xhttp.open("POST", "http://192.168.1.101:8080/pics_save", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('view=createjobcard&format=JSON');
}
