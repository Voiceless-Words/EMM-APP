
let app = {
    init: function(){
        document.getElementById('btn').addEventListener('click', app.takephoto);
    },
    takephoto: function(){
        let opts = {
            quality:  80,
            destinationType: Camera.DestinationType.DATA_URL,
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
        document.getElementById('photo').src = "data:image/jpeg;base64," + imgURI;
        var imgs = "data:image/jpeg;base64," + imgURI;
        $.ajax({
          url: 'http://emmapp.us.openode.io/pics_save',
          type: "post",
          data:{
            jobnumber: '123',
            img:imgs
          },
          error: function () {
            console.log("Something wrong happened");
          },
          success: function () {
            console.log("Successful ajax sent");
          }
        });
    },
    failure: function(msg){
        console.log(msg);
    }
};
document.addEventListener('deviceready', app.init);
