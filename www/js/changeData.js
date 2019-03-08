$(document).ready(function(){
    $('#changeAdminFirstName').submit(function(e){
        e.preventDefault();
        console.log('attempting change');
        if ($('#adminFirstName').val().length > 5)
        {
            changeField('first_name', $('#adminFirstName').val());
        }
        else
            errorOut("The First Name provided was too short", $('.fnameStatus'));
    });
    $('#changeAdminLastName').submit(function(e){
        user = $('#employeeNumber').val();
        e.preventDefault();
        if ($('#adminLastName').val().length > 5)
        {
            changeField('last_name', $('#adminLastName').val());
        }
        else
            errorOut("The Last Name provided was too short", $('.lnameStatus'));
    });

    $('#changePasswordForm').submit(function(e){
        e.preventDefault()
        var password = $('#changePassword').val();
        var cpassword = $('#cchangePassword').val();
        var opassword = $('#opassword').val();
        if (password.length < 6 || cpassword.length < 6)
        {
            alert("your password is too short");
        }
        else if (password.length > 30 || cpassword.length > 30)
        {
            alert("your password is too long");
        }
        else if (cpassword === password)
        {
            changePassword(opassword, password);
        }
        else {
            alert("passwords dont match");
        }
    });

    $('#changeAdminPassword').submit(function(e){
        e.preventDefault()
        var password = $('#adminPassword').val();
        var cpassword = $('#adminCPassword').val();
        var opassword = $('#adminCurrentPassword').val();
        if (password.length < 6 || cpassword.length < 6)
        {
            alert("your password is too short");
        }
        else if (password.length > 30 || cpassword.length > 30)
        {
            alert("your password is too long");
        }
        else if (cpassword === password)
        {
            changePassword(opassword, password);
        }
        else {
            alert("passwords dont match");
        }
    });

    function changeField(name, value)
    {
        $.ajax({
            type : "POST",
            url : 'http://192.168.250.1:3000/data/update_field',
            data : {
                name : name,
                value : value,
                id : window.user
            },
            success : function(data) {
                console.log(data);
            }
        });
    }
    function errorOut(err, out)
    {
        //err is the error u what to print
        //out is the place where u want the error to show
        out.html(err);
    }
});
function changePassword(opassword, password){
    $.ajax({
            type : "POST",
            url : 'http://192.168.250.1:3000/data/change_password',
            data : {
                employeeNumber : window.user,
                password : password,
                opassword : opassword
            },
            success : function(data) {
                console.log(data);
                if (data.status == 200)
                    alert("Password successfully changed");
                if (data.status == 505)
                    alert("Something went wrong, Please try again");
                if (data.status == 100)
                    alert("Incorrect password provided, Please try again");
            }
        });
}
var camearaOptions = {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    targetWidth: 300,
    targetHeight: 400
}
function getImage() {
    navigator.camera.getPicture(uploadPhoto, onError, camearaOptions);
}

function onError(err){ alert(error); }

function uploadPhoto(imageURI) {
    //alert(imageURI);
    var  image;
    getFileContentAsBase64(imageURI,function(base64Image){
      //window.open(base64Image);
      image = base64Image;
      $.ajax({
              type : "POST",
              url : 'http://192.168.250.1:3000/profilePic',
              data : {
                  employeeNumber : window.user,
                  image : image
              },
              success : function(data) {
                  console.log(data);
                  alert("Image Updated");
              }
          });
      // Then you'll be able to handle the myimage.png file as base64
    });

}

/**
 * This function will handle the conversion from a file to base64 format
 *
 * @path string
 * @callback function receives as first parameter the content of the image
 */
function getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}
