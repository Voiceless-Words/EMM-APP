

$(document).ready(function(){

    console.log(new Date());
    console.log(new Date(2019, 0, 27));

    $('.statistics').click(function(){
		window.location.href = "statistics.html";
    });

    $('.listUsers').click(function(){
         $('.searchTab').hide();
        $('.statsDisplay').html(`<div class="lds-dual-ring py-4"></div>`);
        var user = (getUser('creator') === '0000000') ? getUser('employee_id') : getUser('creator');
        getAllUsers(user);  //
    });

    $('.listJobs').click(function (){
         $('.searchTab').hide();
        if (allJobs)
            userClosedJobs(allJobs);
        console.log('clicked');
        console.log(allJobs);
     });

    $(document).on('click', ".selectJob", function(){
		window.location.href = "viewJob.html?job=" + $(this).attr('data-loc');
     });

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
    console.log(getUser('creator'));
    console.log(getUser('employee_id'));
    var job = (getUser('creator') === '0000000') ? getUser('employee_id') : getUser('creator');
    var user = (getUser('creator') === '0000000') ? getUser('employee_id') : getUser('creator');

    console.log(user);

    countJobs(getUser(job));

    countUsers(getUser(user));
});

var users = [];
var jobs = [];

function viewUserData(i){
    var user = users[i];
    $.ajax({
		type : "POST",
		url : "http://192.168.250.1:3000/search/getalljobs",
		data :{
			user: user.employee_id
		},
		success : function(data) {
            jobs = data;

            var status = (user.admin) ? "Admin" : "Field user";
            var jobList = (data.length) ? "jobList" : '';
            console.log(user);
            var userData = ` <div class="col-12 col-md-6 offset-md-3 my-4">
                                <div class="col-12 profile_picture" style="background-image : url(${user.image})"></div>
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
        url : "http://192.168.250.1:3000/search/statSearch",
        data :query,
        success : function(data) {
            users = data;

            var result = data.map(job => ({
                'Job Number': job.jobnumber,
                'Reviewed' : job.reviewStatus,
                Date: (job.time.split('T'))[0]
            }));
            data = result;
            if (data.length == 0)
                $('.statsDisplay').html(`<p class='text-center'>0 results Found</p>`);
            else
            {
                // var paramObj = {
                //     name : 'Igama',
                //     surname : 'Isibongo',
                //     age : 'Age',
                //     dateOfBirth : 'Date of Birth',
                //     favColor : 'Favourite Color'
                // }
                var newObj = onlyPrint(data);
                $('.statsDisplay').html(tabulateData(newObj));

                // if (query.options == 'users')
                // {
                //     var usersList = `
                //         <p class='text-center'>${data.length} ${(data.length > 1) ? 'Users' : 'User'} Found</p>
                //         <div class="mt-4 row text-center">
                //             <div class="col-6"><i class="fa fa-circle tomato"></i> admin</div>
                //             <div class="col-6"><i class="fa fa-circle black"></i> user</div>
                //         </div>
                //         <table class="table table-sm table-hover my-4">
                //         <thead class="thead-dark">
                //             <tr>
                //             <th scope="col">#</th>
                //             <th scope="col">First</th>
                //             <th scope="col">Last</th>
                //             <th scope="col">Employee</th>
                //             <th scope="col" class='d-none d-md-block'>Contact</th>
                //             </tr>
                //         </thead>
                //         <tbody>`;
                //     var line = ``;
                //     var color;
                //     for (let i = 0; i < data.length; i++)
                //     {
                //         color = (data[i].admin == 1)? 'tomato' : 'black';
                //         line += `<tr class="${color} selectUser" data-loc=${i} data-toggle="modal" data-target="#userData">
                //                 <th scope="row">${i + 1}</th>
                //                 <td>${data[i].first_name}</td>
                //                 <td>${data[i].last_name}</td>
                //                 <td>${data[i].employee_id}</td>
                //                 <td class='d-none d-md-block'>${data[i].contact}</td>

                //                 </tr>`;
                //     }
                //     usersList += line;
                //     usersList += `</tbody></table>`;
                //     $('.statsDisplay').html(usersList);
                // }
                // else
                // {
                //     var jobsList = `
                //         <p class='text-center'>${data.length} ${(data.length > 1) ? 'Jobs' : 'Job'} Found</p>
                //         <div>
                //             <h3 class="mt-4 row d-block text-center">Closed Jobs</h3>
                //         </div>
                //         <table class="table table-sm table-hover my-4">
                //         <thead class="thead-dark">
                //             <tr>
                //                 <th scope="col">#</th>
                //                 <th scope="col">Job Number</th>
                //                 <th scope="col" class='d-none d-sm-block'>Reviewed</th>
                //                 <th scope="col" class='d-none d-sm-block'>Date</th>
                //             </tr>
                //         </thead>
                //         <tbody>`;
                //     var line = ``;
                //     // var color;
                //     for (let i = 0; i < data.length; i++)
                //     {
                //         // color = (data[i].admin == 1)? 'tomato' : 'black';
                //         var time = data[i].time.split('T');
                //         line += `<tr class="selectJob" data-loc=${data[i].jobnumber}>
                //                     <th scope="row">${i + 1}</th>
                //                     <td>${data[i].jobnumber}</td>
                //                     <td class='d-none d-sm-block'>${(data[i].reviewStatus == 0) ? 'NO' : 'YES' }</td>
                //                     <td class='d-none d-sm-block'>${time[0]}</td>
                //                 </tr>`;
                //     }
                //     jobsList += line;
                //     jobsList += `</tbody></table>`;
                //     $('.statsDisplay').html(jobsList);
                // }
            }

        }
    });

}

function returnCompanies(query){
    console.log(query);
    $.ajax({
        type : "POST",
        url : "http://192.168.250.1:3000/search/listCompanies",
        data :query,
        success : function(data) {
            console.log(data);
            localStorage.setItem('listCompanies', JSON.stringify(data.data));
        }
    });
}

function countJobs(user){
    if (!user)
        user = (getUser('creator') === '0000000') ? getUser('employee_id') : getUser('creator');
    console.log(user);
  $.ajax({
  type : "POST",
  url : "http://192.168.250.1:3000/search/getalljobs",
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
		url : "http://192.168.250.1:3000/search/getallusers",
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
                                <th scope="col" class='d-none d-sm-block'>Reviewed</th>
                                <th scope="col" class='d-none d-sm-block'>Date</th>
                            </tr>
                        </thead>
                        <tbody>`;
            var line = ``;
            // var color;
            for (let i = 0; i < jobList.length; i++)
            {
                // color = (data[i].admin == 1)? 'tomato' : 'black';
                var time = jobList[i].time.split('T');
                line += `<tr class="selectJob" data-loc=${jobList[i].jobnumber}>
                            <th scope="row">${i + 1}</th>
                            <td>${jobList[i].jobnumber}</td>
                            <td class='d-none d-sm-block'>${(jobList[i].reviewStatus == 0) ? 'NO' : 'YES' }</td>
                            <td class='d-none d-sm-block'>${time[0]}</td>
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
		url : "http://192.168.250.1:3000/search/getallusers",
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
                            <th scope="col" class='d-none d-md-block'>Contact</th>
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
                        <td class='d-none d-md-block'>${data[i].contact}</td>
                        </tr>`;
            }
            usersList += line;
            usersList += `</tbody></table>`;
            $('.statsDisplay').html(usersList);
        }
    });
}

function onlyPrint(dataObj, paramObj = null) {
	if (paramObj === null)
		return (dataObj);
	else {
		var newObj = [];
		for (var i = 0; i < dataObj.length; i++){
			var obj = {};
			for (var key in dataObj[i]) {
				if (dataObj[i].hasOwnProperty(key)) {
					if (paramObj[key] !== undefined){
						obj[paramObj[key]] = dataObj[i][key];
					}
				}
			}
			if (!jQuery.isEmptyObject(obj))
				newObj.push(obj);
		}
		console.log(newObj);
	}
	return newObj;
}

function tabulateData(data) {
	console.log(data);
	var table = ``;
	if (Array.isArray(data) && (Object.prototype.toString.call(data[0]) === '[object Object]')){
		// console.log('work');
		var keys =[];

		for (var i = 0; i < data.length; i++){
			var k = 0;
			for (var key in data[i]) {
				if (!keys.includes(key)) {
					keys.splice(k, 0, key);
				}
				k++;
			}
		}
		//get the keys
		table += `<table cellspacing="0"
				style = '
				font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
				border-collapse: collapse;
				width: 100% !important;
				background-color: transparent;'
			>
			<tr
				style='
				color: #fff;
				background-color: #212529 !important;
				border-color: #32383e;
				
                font-weight:bold'>
                <th style='
						border: 1px solid #ddd;
						padding: 8px;
						padding-top: 12px;
						padding-bottom: 12px;
						text-align: left;
						color: #fff;
						background-color: #212529 !important;
						border-color: #32383e;	
					'>#</th>
			`;

		for (var j = 0; j < keys.length; j++){
			table += `<th style='
						border: 1px solid #ddd;
						padding: 8px;
						padding-top: 12px;
						padding-bottom: 12px;
						text-align: left;
						color: #fff;
						background-color: #212529 !important;
						border-color: #32383e;	
					'>${keys[j]}</th>`;
		}
		table += `</tr>`;
		`<caption style='background-color:#ffffff;color:#1f2240;
		,margin-bottom:1em;font-size:18pt;width:100%;border:0'></caption><tbody>`
		for (var i = 0; i < data.length; i++){
			table += `<tr class="selectUser"><td
                        style='
                        border: 1px solid #ddd;
                        padding: 8px;	
                    '>${i + 1}</td>`;
			for (var j = 0; j < keys.length; j++){
				table += `<td
							style='
							border: 1px solid #ddd;
							padding: 8px;	
						'>${(data[i][keys[j]]) ? data[i][keys[j]] : '-'}</td>`;
			}
			table += `</tr>`;
			
		}
		table += `</tbody></table>`;
	} else {
		table = `The functions expects an array of Objects`;
	}
	return(table);
}
