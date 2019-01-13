
var jobcardstuff = [];
var people_list = [];

$(document).ready(function(){
    var newJob;
    $('#createJobForm').submit(function(e){
        e.preventDefault();
        newJob = {
            jobNumber : $('#addJob-jobCardNumber').val(),
            jobAssets : $('#addJob-assets :selected').text(),
            jobRequiredByDate : $('#addJob-requiredByDate').val(),
            jobActivity : $('#addJob-activity :selected').text(),
            jobAssignedTo : people_list,
            jobCreatedBy : window.user

        };
        $('#createJobForm')[0].reset();
        console.log(newJob);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            console.log('New Job Card Created');
            alert('New Job Card Created');

            }
        }
        xhttp.open("POST", "http://192.168.1.101:8080/jobcard_save", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('newjob='+JSON.stringify(newJob));
    });

    // Do as u like with the form data obj newJob
});

function getjobstuff() {
        var d = Number(new Date());

        document.getElementById('addJob-jobCardNumber').value = d;

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
        xhttp.open("POST", "http://192.168.1.101:8080/getview", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('view=createjobcard&format=JSON');
}


function getdescription() {
    var found = 0;

    jobcardstuff[1].forEach(function(asset){
        if (asset.name == event.target.value)
        {
            document.getElementById('asset_description').innerHTML = asset.description;
            found = 1;
        }
    });
    if (found == 0) {
        document.getElementById('asset_description').innerHTML = '<i>No Asset Selected</i>';
    }

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
