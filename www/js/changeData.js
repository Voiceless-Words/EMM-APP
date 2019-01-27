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
            url : 'http://emmapp.us.openode.io/data/update_field',
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
            url : 'http://emmapp.us.openode.io/data/change_password',
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
    alert(imageURI);
    getBase64(imageURI, function(base64Data){
       alert(base64Data);//here you can have your code which uses base64 for its operation,//file to base64 by oneshubh
    });

    i$.ajax({
            type : "POST",
            url : 'http://192.168.1.101:8080/profilePic',
            data : {
                employeeNumber : window.user,
                image : imageURI,
            },
            success : function(data) {
                console.log(data);
                alert("Image Updated");
            }
        });
}

function getBase64 (file,callback) {

    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));

    reader.readAsDataURL(file);
}
