$(document).ready(function(){
    $('.statistics').click(function(){
		window.location.href = "statistics.html";
    });

    $('.listUsers').click(function(){
        getAllUsers(getUser('creator'));
    });

    $(document).on('click', ".selectUser", function(){
        viewUserData($(this).attr("data-loc"));
    });

    $(document).on('click', ".jobList", function(){
        console.log("close modal and show list");
        $('.closeModal').click();
        userClosedJobs();
    });

    countUsers(getUser('creator'));
});

var users = [];
var jobs = [];

function viewUserData(i){
    $('.displayUserData').html(`<div class="text-center">Loading...</div>`);
    var user = users[i];
    $.ajax({
		type : "POST",
		url : "http://localhost:8080/search/getalljobs",
		data :{
			user: user.employee_id
		},
		success : function(data) {
            jobs = data;

            var status = (user.admin) ? "Admin" : "Field user";
            var jobList = (data.length) ? "jobList" : '';
            console.log(user);
            var userData = ` <div class="col-12 col-md-6 offset-md-3 my-4">
                                <div class="col-12 profile_picture"></div>
                            </div>
                            <div class="col-12">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Employee No: <span class="float-right">${user.employee_id}</span></li>
                                    <li class="list-group-item">Company No: <span class="float-right">${user.creator}</span></li>
                                    <li class="list-group-item">First Name: <span class="float-right">${user.first_name}</span></li>
                                    <li class="list-group-item">Last Name: <span class="float-right">${user.last_name}</span></li>
                                    <li class="list-group-item">Contact: <span class="float-right"><a href="tel:${user.contact}">${user.contact}</a></span></li>
                                    <li class="list-group-item">Status: <span class="float-right">${status}</span></li>
                                    <li class="list-group-item ${jobList}">Closed Jobs: <span class="float-right">${data.length}</span></li>
                                </ul>

                            </div>`;
            $('.displayUserData').html(userData);
        }
    });
}

function countUsers(creator)
{
    $.ajax({
		type : "POST",
		url : "http://localhost:8080/search/getallusers",
		data :{
			user : user,
			creator : creator
		},
		success : function(data) {
            $('.countUsers').text(data.length);
        }
    });
}

function userClosedJobs()
{
    console.log(jobs);
     var jobsList = `<div class="mt-4 row text-center">
                            <h3>User Closed Jobs</h3>
                        </div>
                        <table class="table table-sm table-hover my-4">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Job Number</th>
                            </tr>
                        </thead>
                        <tbody>`;
            var line = ``;
            // var color;
            for (let i = 0; i < jobs.length; i++)
            {
                // color = (data[i].admin == 1)? 'tomato' : 'black';
                line += `<tr class="selectJob" data-loc=${i}>
                            <th scope="row">${i + 1}</th>
                            <td>${jobs[i].jobnumber}</td>
                        </tr>`;
            }
            jobsList += line;
            jobsList += `</tbody></table>`;
            $('.statsDisplay').html(jobsList);
}

function getAllUsers(creator)
{
    console.log('users');
    $.ajax({
		type : "POST",
		url : "http://localhost:8080/search/getallusers",
		data :{
			user : user,
			creator : creator
		},
		success : function(data) {
            console.log(data);
            users = data;
            var usersList = `<div class="mt-4 row text-center">
                            <div class="col-6"><i class="fa fa-circle tomato"></i> admin</div>
                            <div class="col-6"><i class="fa fa-circle black"></i> user</div>
                        </div>
                        <table class="table table-sm table-hover my-4">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Employee</th>
                            </tr>
                        </thead>
                        <tbody>`;
            var line = ``;
            var color;
            for (let i = 0; i < data.length; i++)
            {
                color = (data[i].admin == 1)? 'tomato' : 'black';
                line += `<tr class="${color} selectUser" data-loc=${i} data-toggle="modal" data-target="#userData">
                        <th scope="row">${i + 1}</th>
                        <td>${data[i].first_name}</td>
                        <td>${data[i].last_name}</td>
                        <td>${data[i].employee_id}</td>
                        </tr>`;
            }
            usersList += line;
            usersList += `</tbody></table>`;
            $('.statsDisplay').html(usersList);
        }
    });
}