
var jobcardstuff = [];
var people_list = [];
var asset_lati = '';
var asset_long = '';
var jobcardnumber = '';
var job_location;
var newJob;



$(document).ready(function(){
    $('#createJobForm').submit(function(e){
        e.preventDefault();
        newJob = {
            jobNumber : $('#addJob-jobCardNumber').val(),
            permitNumber : $('#addJob-jobPermitNumber').val(),
            jobAssetsType : $('#addJob-assets-Type :selected').text(),
            assetsMaterial : $('#addJob-assets-Mat :selected').text(),
            jobLocation : job_location,//$('#addJob-jobLocation :selected').text(),
            jobActivity : $('#addJob-activity').text(),
            asset_lati : asset_lati,//$('.asset_lati').text(),
            asset_long : asset_long,// $('.asset_long').text(),
            jobCreatedBy : window.user,
            company: getUser('creator')
        };
        // $('#createJobForm')[0].reset();

        console.log(newJob);

       // console.log($('.usersJobCard').text());
        $('.usersJobCard').click();


        //  var xhttp = new XMLHttpRequest();
        //  xhttp.onreadystatechange = function() {
        //  if (this.readyState == 4 && this.status == 200) {

        //      console.log('New Job Card Created');
        //      console.log(this.response);


        //      }
        //  }
        //  xhttp.open("POST", "http://emmapp.openode.io/jobcard_save", true);
        //  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //  xhttp.send('newjob='+JSON.stringify(newJob));

        //  console.log('I sent :' + JSON.stringify(newJob));

    });

    // Do as u like with the form data obj newJob
});
var x = document.getElementById("asset_location");

//   onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    $('#loader_id').hide();
     asset_lati = position.coords.latitude;
     asset_long = position.coords.longitude;

    x.innerHTML = 'Latitude: '  + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n';
//          'Altitude: '          + position.coords.altitude          + '\n' +
//          'Accuracy: '          + position.coords.accuracy          + '\n' +
//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//          'Heading: '           + position.coords.heading           + '\n' +
//          'Speed: '             + position.coords.speed             + '\n' +
//          'Timestamp: '         + new Date(position.timestamp)      + '\n';

    showPosition(position);
};


function showPosition(position) {
   var xhttp = new XMLHttpRequest();

   var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://us1.locationiq.com/v1/reverse.php?key=dfe0682ca973a1&lat="+
    position.coords.latitude+"&lon="+position.coords.longitude+"&format=json",
    "method": "GET"
   }

   $.ajax(settings).done(function (response) {
      var x_location = document.getElementById('x_location');
      var region = response.address.city;
      if (!region)
        region = response.address.town;


    x_location.innerHTML = "You are near "

      +"<br>Street : "+response.address.road
      +"<br>Area : "+response.address.suburb
      +"<br>City : "+region
      +"<br>County : "+response.address.county
      +"<br>Postcode : "+response.address.postcode
      +"<br>State : "+response.address.state;

    createjobcardno(response.address.suburb);
    job_location = response.address.suburb;

   });

}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    $('#loader_id').hide();
    x.innerHTML = 'Try again. If App asks for location permission, please allow';

}


function getLocation() {

navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000, timeout: 15000, enableHighAccuracy: true });
$('#loader_id').show();
console.log('clicked');


}

function createjobcardno(area) {
    var date = new Date();
    var creator = getUser('creator');
    var seconds = Math.round(Number(date.getTime()) / 1000);
    var cardNumber = creator+seconds+window.user;
    //var area = document.getElementById('addJob-jobLocation').value;
    var prefix = '';
    console.log(new Date());

    prefix = area.replace(/\s/g,'');
//    alert("here in the jobcard create");

    document.getElementById('addJob-jobCardNumber').value = (prefix + cardNumber);
    document.getElementById('usersJobCard').dataset.jobNumber = (prefix + cardNumber);

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
