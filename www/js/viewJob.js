var url_string = window.location.href;
var url = new URL(url_string);
var job = url.searchParams.get("job");

$(document).ready(function () {
    var jobData = getJob(job);
    var assetData = getAsset(job);
    console.log(jobData);
    console.log(assetData);
    //display data here
    var build = ``;
    // add header
    build += `<strong class='text-center d-block'>Job number ${job}</strong><hr/>`;
    build += `<strong>closed by : ${(assetData[0].created_by) ? assetData[0].created_by : 'pending'}</strong><br>`;
    build += `<div class = "col-12"><h3 class='text-center'>Job Details</h3></div>`;
    build += `Permit number : ${assetData[0].permitNumber} <br>
    Job Activity : ${assetData[0].jobActivity}<br>
    Asset Material : ${assetData[0].assetsMaterial}<br>
    Job Location : ${assetData[0].jobLocation} <br>`;
    // `${jobData[0].conditionB[0].electronic}---`;
    var electronics = ``;
    if (jobData[0].conditionB[0].electronic == 'Yes')
    {
        electronics += `
            <div class='row'>
            <div class = "col-10 border-bottom">Fitted Securely?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].electSecure}</div>
            <div class = "col-10 border-bottom">All Doors in Operation?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].electDoor}</div>
            <div class = "col-10 border-bottom">Transponder Secure?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].electTransponder}</div>
            <div class = "col-10 border-bottom">Door Bypassed?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].electDoorBypassed}</div>
            <div class = "col-10 border-bottom">Battery Installed?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].battery}</div>
            <div class = "col-10 border-bottom">In a working condition?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].working}</div>
            <div class = "col-10 border-bottom">Remote Devices Working?</div><div class="col-2 border-bottom">${jobData[0].conditionB[0].remote}</div>
            </div>
        
            `
    }
    build += electronics;
    build += `<div class = "col-12"><h3 class='text-center'>Box Condition</h3></div>
            <div class='row'>
                <div class = "col-10 border-bottom">Visible body damage?</div><div class="col-2 border-bottom">${jobData[0].conditionA[0].boxDamage}</div>
                <div class = "col-10 border-bottom">Can all the doors be opened, and secured?</div><div class="col-2 border-bottom">${jobData[0].conditionA[0].boxDoor}</div>
                <div class = "col-10 border-bottom">Plinth Visible?</div><div class="col-2 border-bottom">${jobData[0].conditionA[0].plinthVisible}</div>
                <div class = "col-10 border-bottom">Plinth in a good Condition?</div><div class="col-2 border-bottom">${jobData[0].conditionA[0].plinthCondition}</div>
            </div>`;
    build += `<div class = "col-12"><h3 class='text-center'>Cable Information</h3></div>
            <div class='row'>
                <div class='col-12'>cable count : ${jobData[0].cables.length}</div>
            <div>`;

    $('.jobDetails').html(build);

});


function getJob(job){
    var jobObj = {jobNumber : job};
    var res;
    $.ajax({
        type : "POST",
        async: false,
		url : "http://localhost:8080/search/getJob",
		data :jobObj,
		success : function(data) {
            res = data;
        }
    });
    return(res);
}

function getAsset(job){
    var jobObj = {jobNumber : job};
    var res;

    $.ajax({
        type : "POST",
        async: false,
		url : "http://localhost:8080/search/getAsset",
		data :jobObj,
		success : function(data) {
            res = data;
        }
    });
    return res;
}