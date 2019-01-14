
var jobcardstuff = [];
var people_list = [];
var asset_lati = '';
var asset_long = '';
var jobcardnumber = '';

var newJob;
$(document).ready(function(){
    $('#createJobForm').submit(function(e){
        e.preventDefault();
        newJob = {
            jobNumber : $('#addJob-jobCardNumber').val(),
            permitNumber : $('#addJob-jobPermitNumber').val(),
            jobAssetsType : $('#addJob-assets-Type :selected').text(),
            assetsMaterial : $('#addJob-assets-Mat :selected').text(),
            jobLocation : $('#addJob-jobLocation :selected').text(),
            jobActivity : $('#addJob-activity').text(),
            asset_lati : asset_lati,//$('.asset_lati').text(),
            asset_long : asset_long,// $('.asset_long').text(),
            jobCreatedBy : window.user,
            company: getUser('creator')
        };
        // $('#createJobForm')[0].reset();

        console.log(newJob);

       // console.log($('.usersJobCard').text());
      //  $('.usersJobCard').click();


         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {

             console.log('New Job Card Created');
             console.log(this.response);
             alert(this.response);

             }
         }
         xhttp.open("POST", "http://localhost:8080/jobcard_save", true);
         xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         xhttp.send('newjob='+JSON.stringify(newJob));

         console.log('I sent :' + JSON.stringify(newJob));

    });

    // Do as u like with the form data obj newJob
});
/*
function getjobstuff() {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            //console.log(this.responseText.users);
                var response = JSON.parse(this.responseText);
                console.log(response.users);
                console.log(response.assets);


                if (jobcardstuff.length != 2) {

                    response.users.forEach(function(user) {
                    var o = new Option(user.employee_id, user.employee_id);
                    $(o).html(user.first_name);
                    $("#addJob-assign").append(o)

                     });


                    response.assets.forEach(function(asset) {
                    var o = new Option(asset.name, asset.name);
                    $(o).html(asset.name);
                    $("#addJob-assets").append(o)

                });

                }

                jobcardstuff = [response.users, response.assets]
            }
        }
        xhttp.open("POST", "http://localhost:8080/getview", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('view=createjobcard&format=JSON');
}
*/

var x = document.getElementById("asset_location");

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    $('#loader_id').hide();
     asset_lati = position.coords.latitude;
     asset_long = position.coords.longitude;
    x.innerHTML = 'Latitude: '  + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n';
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    $('#loader_id').hide();
    x.innerHTML = 'Try again. If App asks for location permission, please allow';

}


function getLocation() {

navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
$('#loader_id').show();
console.log('clicked');


}

function createjobcardno() {
    var date = new Date();
    var creator = getUser('creator');
    var seconds = Math.round(date.getTime() / 1000);
    var cardNumber = creator+seconds+window.user;
    var area = document.getElementById('addJob-jobLocation').value;
    var prefix = '';
    console.log(new Date());

    if (area == 'Buurendal') {
        prefix = 'BDL';
    } else if (area == 'Highway Garden') {
        prefix = 'HG';
    } else if (area == 'Harmelia') {
        prefix = 'HR';
    }

    document.getElementById('addJob-jobCardNumber').value = prefix + cardNumber;
    document.getElementById('usersJobCard').dataset.jobNumber = prefix + cardNumber;

    jobcardnumber = prefix + cardNumber;

}

function recordselect() {
    var added = 0;
    var i = 0;

    if (event.target.value == '0') {
        people_list = [];
        document.getElementById('people').innerHTML = '';
        document.getElementById('msg').innerHTML = '<div class="alert alert-success"><strong>Cleared!</strong> Please assign jobcard</div>';
    }
    else {
        if (people_list.length < 3 ) {

            people_list.forEach((user_id)=>{
                if (user_id == event.target.value) {
                    added = 1;
                }
            });

            if (added != 1)
            {
                people_list.push(event.target.value);
                jobcardstuff[0].forEach((user) => {

                    if (user.employee_id == event.target.value) {
                        document.getElementById('people').innerHTML += user.first_name +' '+user.last_name + " <br>";
                        document.getElementById('msg').innerHTML = '<div class="alert alert-success">'+user.first_name+' is queued for this Jobcard</div>';
                    }
                });
            }
            else
                document.getElementById('msg').innerHTML = '<div class="alert alert-info">This user is already queued for this Jobcard</div>';
        }
        else {
            document.getElementById('msg').innerHTML = '<div class="alert alert-warning">You may add upto 3 employees only</div>';
        }

    }

}
