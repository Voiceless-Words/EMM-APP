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

});