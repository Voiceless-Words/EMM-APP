var url_string = window.location.href;
var url = new URL(url_string);
var job = url.searchParams.get("job");

$(document).ready(function () {
    $('.jobDetails').html(`<div class="lds-dual-ring py-4"></div>`);
    if (getJobAndAsset(job))
        console.log('cooking with gas');

    // var assetData = getAsset(job);

    console.log('ready------->');
});

function build(data) {
    var jobData = data[0];
    var assetData = data[1];
    console.log('jobData');
    console.log(jobData);
    console.log('assetData');
    console.log(assetData);
    //display data here
    var build = ``;
    // add header
    build += `<strong class='text-center d-block'>Job number ${job}</strong><hr/>`;
    build += `<strong>closed by : ${(assetData.created_by) ? assetData.created_by : 'pending'}</strong><br>`;
    build += `<div class = "col-12"><h3 class='text-center'>Job Details</h3></div>`;
    build += `Permit number : ${assetData.permitNumber} <br>
    Job Activity : ${assetData.jobActivity}<br>
    Asset Material : ${assetData.assetsMaterial}<br>
    Job Location : ${assetData.jobLocation} <br>`;
    // `${jobData[0].conditionB[0].electronic}---`;
    var electronics = ``;
    if (jobData.conditionB[0].electronic == 'Yes')
    {
        electronics += `
            <div class='row'>
            <div class = "col-10 border-bottom">Fitted Securely?</div><div class="col-2 border-bottom">${jobData.conditionB[0].electSecure}</div>
            <div class = "col-10 border-bottom">All Doors in Operation?</div><div class="col-2 border-bottom">${jobData.conditionB[0].electDoor}</div>
            <div class = "col-10 border-bottom">Transponder Secure?</div><div class="col-2 border-bottom">${jobData.conditionB[0].electTransponder}</div>
            <div class = "col-10 border-bottom">Door Bypassed?</div><div class="col-2 border-bottom">${jobData.conditionB[0].electDoorBypassed}</div>
            <div class = "col-10 border-bottom">Battery Installed?</div><div class="col-2 border-bottom">${jobData.conditionB[0].battery}</div>
            <div class = "col-10 border-bottom">In a working condition?</div><div class="col-2 border-bottom">${jobData.conditionB[0].working}</div>
            <div class = "col-10 border-bottom">Remote Devices Working?</div><div class="col-2 border-bottom">${jobData.conditionB[0].remote}</div>
            </div>

            `
    }
    build += electronics;
    build += `<div class = "col-12"><h3 class='text-center'>Box Condition</h3></div>
            <div class='row'>
                <div class = "col-10 border-bottom">Visible body damage?</div><div class="col-2 border-bottom">${jobData.conditionA[0].boxDamage}</div>
                <div class = "col-10 border-bottom">Can all the doors be opened, and secured?</div><div class="col-2 border-bottom">${jobData.conditionA[0].boxDoor}</div>
                <div class = "col-10 border-bottom">Plinth Visible?</div><div class="col-2 border-bottom">${jobData.conditionA[0].plinthVisible}</div>
                <div class = "col-10 border-bottom">Plinth in a good Condition?</div><div class="col-2 border-bottom">${jobData.conditionA[0].plinthCondition}</div>
            </div>`;
    build += `<div class = "col-12"><h3 class='text-center'>Cable Information</h3></div>
            <div class='row'>
                <div class='col-12'>cable count : ${jobData.cables.length}</div>
            <div>`;
            if (jobData.cables.length > 0)
            {
                var cables = `<table class="table table-sm table-hover my-4">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Correctly Placed</th>
                                <th scope="col">Securely Placed</th>
                                <th scope="col">Label Level</th>
                                <th scope="col">Breaker Condition</th>
                                <th scope="col">Breaker Secured</th>
                                <th scope="col">Size</th>
                                <th scope="col">Meters secured</th>
                            </tr>
                        </thead>
                        <tbody>`;
                var line = ``;

                for (var i = 0; i < jobData.cables.length; i++)
                {
                    // console.log(jobData[i].jobnumber);
                    line += `<tr class="selectJob" data-loc=${jobData.jobnumber}>
                                <th scope="row">${i + 1}</th>
                                <td>${jobData.cables[i].correct}</td>
                                <td>${jobData.cables[i].tag}</td>
                                <td>${(jobData.cables[i].label == 'Yes') ? 'Level' : 'Not level' }</td>
                                <td>${jobData.cables[i].breaker}</td>
                                <td>${(jobData.cables[i].fitted == 'Yes') ? 'Securely' : 'Hanging' }</td>
                                <td>${jobData.cables[i].size}</td>
                                <td>${jobData.cables[i].meter}</td>
                            </tr>`;
                }
                cables += line;
                cables += `</tbody></table>`;
                build += cables;
            }
    // var cables =

    // $('.jobDetails').html(build);
    return (build);
}


function getJobAndAsset(job){
    console.log('calling---------------------->')
    var jobObj = {jobNumber : job};
    var res;
    var getJobFunc = $.ajax({
        type : "POST",
		url : "http://192.168.250.1:3000/search/getJobAndAsset",
		data :jobObj,
		success : function(data) {
           console.log(data);
           $('.jobDetails').html(build(data));
        }
    });
}
