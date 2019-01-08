$(document).ready(function(){
    var newJob;
    $('#createJobForm').submit(function(e){
        e.preventDefault();
        newJob = {
            jobNumber : $('#addJob-jobCardNumber').val(),
            jobAssets : $('#addJob-assets :selected').text(),
            jobRequiredByDate : $('#addJob-requiredByDate').val(),
            jobActivity : $('#addJob-activity :selected').text(),
            jobAssignedTo : $('#Job-assign :selected').text(),

        };
        $('#createJobForm')[0].reset();
        console.log(newJob);
    });

    // Do as u like with the form data obj newJob

    console.log(JSON.stringify(newJob));

});

var jobcardstuff = []

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
        xhttp.open("POST", "http://localhost:8080/getview", true);
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