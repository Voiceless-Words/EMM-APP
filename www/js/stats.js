

$(document).ready(function(){

    console.log(new Date());
    console.log(new Date(2019, 0, 27));

    $('.statistics').click(function(){
		window.location.href = "statistics.html";
    });

    $('.listUsers').click(function(){
         $('.searchTab').hide();
        $('.statsDisplay').html(`<div class="lds-dual-ring py-4"></div>`);
        getAllUsers(getUser('creator'));
    });

    $('.listJobs').click(function (){
         $('.searchTab').hide();
        if (allJobs)
            userClosedJobs(allJobs);
        console.log('clicked');
        console.log(allJobs);
     })

    $('#searchOptions').on('change', function() {
        console.log( this.value );
        if (this.value === 'jobs')
        {
            //reset dates and disable fields
            $("#startDate").prop('disabled', false);
            $("#endDate").prop('disabled', false);
        }
        else if (this.value === 'users')
        {
            $("#startDate").val('');
            $("#endDate").val('');
            $("#startDate").prop('disabled', true);
            $("#endDate").prop('disabled', true);
            //enable date fields
        }
    });

     $('.searchEngine').click(function (){
         var companies = ``;
        if (getUser('employee_id') == '0000000')
        {
            var list;
            returnCompanies();
            list = JSON.parse(localStorage.getItem('listCompanies'));
            console.log(list);
            if (list)
            {
                companies +=    `<label for="quality">Company</label>
                                <select class="form-control" id="companySelect">`;
                for (company in list)
                {
                    companies += `<option value="${list[company].employee_id}">${list[company].first_name} ${list[company].last_name}</option>`;
                }
                companies += `</select>`;
                $('.companiesOption').html(companies);
            }
        }
        

        $('.searchTab').show();
     });

    $(document).on('click', ".selectUser", function(){
        $('.displayUserData').html(`<div class="Blds-dual-ring"></div>`);
        viewUserData($(this).attr("data-loc"));
    });

    $(document).on('click', ".jobList", function(){
         $('.searchTab').hide();
        console.log("close modal and show list");
        $('.closeModal').click();
        userClosedJobs(jobs);
    });
    
    $('#searchForm').submit(function(e){
        e.preventDefault();
        $('.statsDisplay').html(`<div class="lds-dual-ring py-4"></div>`);

        var querySearch = {
            queryTerm : $('#search').val(),
            startDate : $('#startDate').val(),
            endDate : $('#endDate').val(),
			company : (getUser('employee_id') == '0000000') ? $('#companySelect :selected').val() : getUser('creator'),
			options : $('#searchOptions :selected').val(),
            user : getUser('employee_id'),
            userCompany : getUser('creator')
        };
        querySearch.company = (querySearch.company == '0000000') ? getUser('employee_id') : querySearch.company;
        returnSearch(querySearch);
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

function returnSearch(query){
    console.log(query);
    $.ajax({
        type : "POST",
        url : "http://localhost:8080/search/statSearch",
        data :query,
        success : function(data) {
            users = data;
            if (data.length == 0)
                $('.statsDisplay').html(`<p class='text-center'>0 results Found</p>`);
            else 
            {
                if (query.options == 'users')
                {
                    var usersList = `
                        <p class='text-center'>${data.length} ${(data.length > 1) ? 'Users' : 'User'} Found</p>
                        <div class="mt-4 row text-center">
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
                else
                {
                    var jobsList = `
                        <p class='text-center'>${data.length} ${(data.length > 1) ? 'Jobs' : 'Job'} Found</p>
                        <div>
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
                    for (let i = 0; i < data.length; i++)
                    {
                        // color = (data[i].admin == 1)? 'tomato' : 'black';
                        line += `<tr class="selectJob" data-loc=${i}>
                                    <th scope="row">${i + 1}</th>
                                    <td>${data[i].jobnumber}</td>
                                </tr>`;
                    }
                    jobsList += line;
                    jobsList += `</tbody></table>`;
                    $('.statsDisplay').html(jobsList);
                }
            }
            
        }
    });

}

function returnCompanies(query){
    console.log(query);
    $.ajax({
        type : "POST",
        url : "http://localhost:8080/search/listCompanies",
        data :query,
        success : function(data) {
            console.log(data);
            localStorage.setItem('listCompanies', JSON.stringify(data.data));
        }
    });
}

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
