$(document).ready(function(){
    $('.statistics').click(function(){
		window.location.href = "statistics.html";
    });

    $('.listUsers').click(function(){
        $('.statsDisplay').html(`<div class="lds-dual-ring py-4"></div>`);
        getAllUsers(getUser('creator'));
    });

    $('.listJobs').click(function (){
        if (allJobs)
            userClosedJobs(allJobs);
        console.log('clicked');
        console.log(allJobs);
     })

    $(document).on('click', ".selectUser", function(){
        $('.displayUserData').html(`<div class="Blds-dual-ring"></div>`);
        viewUserData($(this).attr("data-loc"));
    });

    $(document).on('click', ".jobList", function(){
        console.log("close modal and show list");
        $('.closeModal').click();
        userClosedJobs(jobs);
    });

    countJobs(getUser('creator'));

    countUsers(getUser('creator'));
});

var users = [];
var jobs = [];

function viewUserData(i){
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

var allJobs;

function countJobs(user){
  $.ajax({
  type : "POST",
  url : "http://localhost:8080/getalljobs",
  data :{
    user : user,
  },
  success : function(data) {
          $('.loadingCountJobs').html(`<div class="text-center"><span class="badge badge-secondary countJobs">${data.length}</span></div>`);
          allJobs = data;
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
            $('.loadingCountUsers').html(`<div class="text-center"><span class="badge badge-secondary countUsers">${data.length}</span></div>`);
        }
    });
}

function userClosedJobs(jobList)
{
    console.log(jobList);
     var jobsList = `<div>
                            <h3 class="mt-4 row d-block text-center">Closed Jobs</h3>
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
            for (let i = 0; i < jobList.length; i++)
            {
                // color = (data[i].admin == 1)? 'tomato' : 'black';
                line += `<tr class="selectJob" data-loc=${i}>
                            <th scope="row">${i + 1}</th>
                            <td>${jobList[i].jobnumber}</td>
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
