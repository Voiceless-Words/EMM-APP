var imagesList = [];
let app = {
    init: function(){
        document.getElementById('btn').addEventListener('click', app.takephoto);
        document.getElementById("profile").addEventListener('click', app.takephoto1);
    },
    takephoto1: function(){

          let opts1 = {
              quality:  80,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              mediaType: Camera.MediaType.PICTURE,
              encodingType: Camera.EncodingType.JPEG,
              cameraDirection: Camera.Direction.BACK,
              targetWidth: 300,
              targetHeight: 400
          };
          navigator.camera.getPicture(app.success2, app.failure2, opts1);
    },
    takephoto: function(){

        if (jobcardnumber == '')
        {
            alert('Please start a job first');
        }
        else {
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
        }
    },
    success1: function(imgURI){
        document.getElementById('photo').src = "data:image/jpeg;base64," + imgURI;
        var imgs = "data:image/jpeg;base64," + imgURI;
        imagesList.push(imgs);
    },
    failure: function(msg){
        console.log(msg);
    },
    success2: function(imgURI){
        /*document.getElementById('photo').src = "data:image/jpeg;base64," + imgURI;
        var imgs = "data:image/jpeg;base64," + imgURI;
        imagesList.push(imgs);*/
        console.log("Picture saved");
    },
    failure2: function(msg){
      console.log(msg);
    }
};
document.addEventListener('deviceready', app.init);
