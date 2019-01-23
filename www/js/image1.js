let profile = {
    init1: function(){
        document.getElementById('profile').addEventListener('click', profile.takephoto1);
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
        navigator.camera.getPicture(profile.success2, profile.failure1, opts1);
    },
    success2: function(imgURI){
        /*document.getElementById('photo').src = "data:image/jpeg;base64," + imgURI;
        var imgs = "data:image/jpeg;base64," + imgURI;
        imagesList.push(imgs);*/
        alert("picture taken");
    },
    failure1: function(msg){
        console.log(msg);
    }
};
document.addEventListener('deviceready', profile.init1);
