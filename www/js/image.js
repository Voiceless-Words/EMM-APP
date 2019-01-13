
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
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;
        $.ajax({
          url:"http://localhost:8080/pic_save",
          data:{
            jobnumber: "123",
            img:"imgURI"
          },
          error: function () {
            console.log("Something wrong happened");
          },
          success: function () {
            console.log("Successful ajax sent");
          },
          type: 'POST'
        });

    },
    failure: function(msg){
        document.getElementById('msg').textContent = msg;
    }
};
document.addEventListener('deviceready', app.init);
