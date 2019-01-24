let profile = {
    inits: function(){
        document.getElementById('profile').addEventListener('click', profile.takephotos);
    },
    takephotos: function(){
        let optss = {
            quality:  80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
        };
        navigator.camera.getPicture(profile.successs, profile.failures, optss);
    },
    successs: function(imgURI){
        /*document.getElementById('photo').src = "data:image/jpeg;base64," + imgURI;
        var imgs = "data:image/jpeg;base64," + imgURI;
        imagesList.push(imgs);*/
        alert("picture taken");
    },
    failures: function(msg){
        console.log(msg);
    }
};
document.addEventListener('deviceready', profile.inits);
