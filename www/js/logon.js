
$(document).ready(function(){
	var request = indexedDB.open('formInputs', 1);

	request.onupgradeneeded = function(event){
		var db = event.target.result;
		if(!db.objectStoreNames.contains('formInputs')){
			var os = db.createObjectStore('formInputs', {keyPath: "id", autoIncrement: true});
			os.createIndex('jobNumber', 'jobNumber', {unique:true});
		}
	}
	//succes
	request.onsuccess = function(event){
		console.log('success database open');
		db = event.target.result;
		if(navigator.onLine){
			var transaction = db.transaction(["formInputs"], "readwrite");
			transaction.onsuccess = function(event) {
				console.log("Opened transaction successfully");
			};

			transaction.onerror = function(event) {
				console.log("Transaction not complete: "+transaction.error);
			}

			var objectStore = transaction.objectStore("formInputs");
			var storeRequest = objectStore.getAll();

			storeRequest.onsuccess = function(event) {
				console.log("request succesfull we get all records");

				var myRecords = storeRequest.result;
				var i = 0;
				while(i < myRecords.length)
				{
					console.log(myRecords[i]);
					var jobNo = Object.keys(myRecords[i])[0];
					var jobNo1 = Object.keys(myRecords[i])[1];
					var jobNo2 = Object.keys(myRecords[i])[2];
					var stringD = JSON.stringify(myRecords[i][jobNo1]);
					var num = myRecords[i][jobNo];
					console.log(stringD);
					$.ajax({
						url:"http://emmapp.us.openode.io/form_save",
						data:{
							jobNo: num,
							form:stringD,
						},
						error: function () {
							console.log("Something wrong happened");
						},
						succes: function () {
							console.log("Successful ajax sent");
						},
						type: 'POST'
					});
					var deleteValue = objectStore.delete(myRecords[i][jobNo2]);

					deleteValue.onsuccess = function(event) {
						console.log("Deleted the value");
					}
					i++;
				}
			}
		}
	};
				//error
	request.onerror = function(event){
		console.log('error database not opened');
	};

//  onclick="document.getElementById('body2').style.display = 'block';
//  document.getElementById('body1').style.display = 'none';"
//  $('#sidebar').addClass('active');
	var boxCondition = [];

	// $('#loginForm').submit(function(e){
	// 	e.preventDefault();
	// 	console.log("sending");

	// 	var username = $('#employeeNumber').val();
	// 	var password = $('#loginPassword').val();
	// 	var xhttp = new XMLHttpRequest();
	// 	xhttp.onreadystatechange = function() {
	//  		if (this.readyState == 4 && this.status == 200) {

	//  				var response = JSON.parse(this.responseText);
	//  				console.log(response.status);

	//  				if (response.status == 2) {
	//  					$('#loginBody').hide();
    //                     $('#dashboardBody').show();
    //                     $('#content').show();
    //                     window.user = username;
	//  				}
	//  				else if (response.status == 1) {
	// 					$('#loginBody').hide();
	// 					$('#dashboardBodyUser').show();
	// 					$('#contentUser').show();
	// 					window.user = username;
	//  				}
	//  				else if (response.status == -1)
	//  				{
	//  					alert('show Interface to create password');
	// 					 console.log(username);
	// 					$('#employeeNumber_create').val(username);
	// 					$('#createPasswordBody').show().siblings().hide();

	//  				}
	//  				else
	//  				{
	//  					alert('Incorrect Credentials');
	//  				}
	//  			}
	// 	}
	// 	xhttp.open("POST", "http://emmapp.us.openode.io/user/login", true);
	//  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//  		xhttp.send('username='+username
	//  			+"&password="+password);


		//  if ($('#loginPassword').val() == 1)
		//  {
		//  	$('#loginBody').hide();
		// 	$('#dashboardBodyUser').show();
		//  	$('#contentUser').show();
		//  }
		//  else
		//  {
		// 	$('#loginBody').hide();
		//  	$('#dashboardBody').show();
		//  	$('#content').show();
		//  }
	//     $.ajax({
	//         type : "POST",
	//         url : 'http://emmapp.us.openode.io/cordova',
	//         success : function(data) {

	//                 $('#loginBody').hide();
	//                 $('#dashboardBody').show();
	//                 $('#content').show();

	//         }
	//     });
	// });

	$('.signOutBuutton').click(function(e){
		$('#sidebar').removeClass('active');  //close side bar
		$('#sidebarUser').removeClass('active');  //close side bar
		e.preventDefault();  //stop link from redirecting
		//clean all data stored on the local storage about the current user session;
		$('#content').hide();
		$('#contentUser').hide();
		$('.top_nav').hide();
		$('#loginBody').show().siblings().hide();
		console.log("sign out");
        window.user = 0;
	});

	$('.userAccountsButton').click(function(){
		$('.top_nav').show();
		$('#sidebar').removeClass('active');  //close side bar
		$('#accountsBody').show().siblings().hide();

	});

	$('.adminProfile').click(function(){
		$('.top_nav').show();
		$('#sidebar').removeClass('active');  //close side bar
		$('#adminProfile').show().siblings().hide();

	});

	$('.dashboardButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		$('#dashboardBody').show().siblings().hide();
	});

	$('.jobCardButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		$('#jobCardBody').show().siblings().hide();
	});

	$('.assignedJobsButton').click(function(){
		$('#sidebarUser').removeClass('active');  //close side bar
		$('#assignedJobsBody').show().siblings().hide();
	});

	$('.helpButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		$('#helpBody').show().siblings().hide();
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});
	$('#sidebarCollapseUser').on('click', function () {
		$('#sidebarUser').toggleClass('active');
	});

	$('.emm-body').click(function(){
		$('#sidebar').removeClass('active');
		$('#sidebarUser').removeClass('active');
	});

	var conditionAData;
	var conditionBData;
	var jobs = {};

	$('#conditionA').submit(function(e){
		e.preventDefault();
		$('#conditionButton').hide();
			conditionAData = {
			boxDoor : $('#boxDoor :selected').text(),
			boxDamage : $('#boxDamage :selected').text(),
			plinthVisible : $('#plinthVisible :selected').text(),
			plinthCondition : $('#plinthCondition :selected').text(),
			plinthDefect : $('#plinthDefect').text(),
		}
		$('#conditionA').hide();
		$('#conditionB').show();
		// console.log(conditionAData.boxDamage);
		console.log($('#plinthDefect').text());
	});

	$('#conditionB').submit(function(e){
		e.preventDefault();
			conditionBData = {
			electronic : $('#electronic :selected').text(),
			electSecure : $('#electSecure :selected').val(),
			electDoor : $('#electDoor :selected').val(),
			electTransponder : $('#electTransponder :selected').val(),
			electDoorBypassed : $('#electDoorBypassed :selected').val(),
			battery : $('#battery :selected').val(),
			working : $('#working :selected').val(),
			remote : $('#remote :selected').val(),
		}
		$('#conditionA').hide().siblings().hide();
		$('.addCable').show().siblings().show();
		$('.markJobFinished').show();
		// console.log(conditionAData.boxDamage);
		jobs[jobNumber]['conditionAData'] = conditionAData;
		jobs[jobNumber]['conditionBData'] = conditionBData;
		// console.log(jobs);
	});

	$('#conditionButton').click(function(){
		$('#conditionA').show().siblings().hide();
		$('.formContainer').show().siblings().hide();
		$('.markJobFinished').hide();

	});

	$('.markJobFinished').click(function(){
		// select where data-jobNumber == jobNumber and set disabled to true
		jobs['status'] = 1;
		jobs[jobNumber]['cables'] = cablesObj;

		if(navigator.onLine){
				//get values here piet
				var jobNo = Object.keys(jobs)[0];
				console.log(jobNo);
				var stringD = JSON.stringify(jobs);
				$.ajax({
					url:"http://emmapp.us.openode.io/form_save",
					data:{
						jobNo: jobNo,
						form:stringD,
					},
					error: function () {
						console.log("Something wrong happened");
					},
					succes: function () {
						console.log("Successful ajax");
					},
					type: 'POST'
				});
		}
		else{
			//add the values from the form
			var jobNo = Object.keys(jobs)[0];
			var transaction = db.transaction(["formInputs"], "readwrite");

			var store = transaction.objectStore("formInputs");

			//all the values goes here
			var formInput = {jobNumber: jobNo, jobs:jobs};

			var request = store.add(formInput);

			//onsuccess
			request.onsuccess = function(e){
				console.log("The form data was saved");
				//window.location.href="localhost:81/www/index.html"
			}

			//error
			request.onerror = function(e){
				alert("sorry form data was not added");
				console.log('Error', e.target.error.name);
			}
		}
		console.log(jobs);
		var clean;
		conditionAData = clean;
		conditionBData = clean;
		cableCount = 0;
		cableCount = clean;
		$('#conditionA').show();
		$('.addCable').hide().siblings().hide();
		$('.markJobFinished').hide();
		$('.closeModal').click();
		$('[data-jobNumber="'+jobNumber+'"]').hide();
		$('#conditionA')[0].reset();
		$('#conditionB')[0].reset();
	});
var jobNumber = 0;
	$('.userJobCard').click(function(){
		$('#addCableForm').hide();
		$('.formContainer').show();
		console.log(typeof conditionAData);
		if (conditionAData)
		{
			$('#conditionButton').show().siblings().show();
			$('.markJobFinished').show();
			$('#conditionA').hide().siblings().hide();
		}
		else {
			$('#conditionA').show();
		}
		if (jobNumber != 0 && jobNumber != $(this).attr("data-jobNumber") && conditionAData)
		{
			alert("Please finish Job "+ jobNumber +" before doing other jobs");
			$('.bd-example-modal-lg').hide();
		}else{
			jobNumber = $(this).attr("data-jobNumber");
			jobs[jobNumber] = {};
			jobs['status'] = 0;
		}
		console.log(jobs);
		$('#addCableForm')[0].reset();
		$('.jobDisplay').text(jobNumber);
	});

	var cableCount = 0;
	var cablesObj = [];

	$('.addCable').click(function(){
		$(this).hide();
		cableCount++;
		$('#addCableForm').show();
		$('#conditionButton').hide();

		$('.formContainer').show().siblings().hide();
		$('.markJobFinished').hide();
	});

	$('#addCableForm').submit(function (e) {
		e.preventDefault();
		var name = cableCount;
		//cablesObj['cableCount'] = cableCount;
		cablesObj.push({
			name: "cable"+cableCount,
			correct : $('#correct :selected').text(),
			tag : $('#tag :selected').text(),
			label : $('#label :selected').text(),
			fitted : $('#fitted :selected').text(),
			size : $('#size :selected').text(),
			meter : $('#meter :selected').val(),
			meterSeals : $('#meterSeals :selected').val(),
			meterSealsColour : $('#meterSealsColour :selected').val(),
			meterBypassed : $('#meterBypassed :selected').val(),
			standConnected : $('#standConnected').val(),
		});
		var current = $('.cables').html();
		current += `<div class="col-12 btn btn-primary mt-2 mb-2 text-center cableSelect" data-cableName="${name}"><strong>${name}</strong></div>`;
		$('.cables').html(current);
		$('.addCable').show().siblings().show();
		$('#addCableForm').hide();
		$('#addCableForm')[0].reset();
		$('.markJobFinished').show();
		console.log(cablesObj);
	});

	$(document).on('click', ".cableSelect", function(){
		var name = $(this).attr("data-cableName") - 1;
		console.log(cablesObj);
		$("#correct option[value="+ cablesObj[name].correct +"]").prop('selected', 'selected');
		$("#tag option[value="+ cablesObj[name].tag +"]").prop('selected', 'selected');
		$("#label option[value="+ cablesObj[name].label +"]").prop('selected', 'selected');
		$("#fitted option[value="+ cablesObj[name].fitted +"]").prop('selected', 'selected');
		$("#size option[value="+ cablesObj[name].size +"]").prop('selected', 'selected');
		$("#meter option[value="+ cablesObj[name].meter +"]").prop('selected', 'selected');
		if (cablesObj[name].meter != "NA")
		{
			$("#meterSeals option[value="+ cablesObj[name].meterSeals +"]").prop('selected', 'selected');
			$("#meterSealsColour option[value="+ cablesObj[name].meterSealsColour +"]").prop('selected', 'selected');
			$("#meterBypassed option[value="+ cablesObj[name].meterBypassed +"]").prop('selected', 'selected');
		}
		$("#standConnected option[value="+ cablesObj[name].standConnected +"]").prop('selected', 'selected');

		$('#addCableForm').show();
		$('.formContainer').show().siblings().hide();
		$('.markJobFinished').hide();
	});

	$("#addJob-assign").on('change', function(e) {
		if (Object.keys($(this).val()).length > 3) {
			$('option[value="' + $(this).val().toString().split(',')[3] + '"]').prop('selected', false);
		}
	});

	$('#plinthCondition').change(function(){
		if($('#plinthCondition :selected').text() === "No")
			$('.plinthDefectParent').show(600);
		else
			$('.plinthDefectParent').hide();
	});

	$('#electronic').change(function(){
		if($('#electronic :selected').text() === "Yes")
			$('#elect').show(600);
		else
			$('#elect').hide();
	});

	$('#meter').change(function(){
		if($('#meter :selected').val() != "NA")
			$('#meterC1').show(600);
		else
			$('#meterC1').hide();
	});

	$("#loginForm").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
        var user = {
			username : $("#employeeNumber").val(),
            password : $("#loginPassword").val()
		};
		check_data(user,  "http://emmapp.us.openode.io/user/login");
    });

	$("#registerForm").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
        var user = {
			employee_id : $("#regEmployeeNumber").val(),
            first_name : $("#firstName").val(),
            last_name : $("#lastName").val(),
            contact : $("#contactNumber").val(),
            password : 123456,
			creator: window.user
		}

		check_data(user,  "http://emmapp.us.openode.io/user/register");
    });

	$("#createPasswordForm").submit(function (e) {
        e.preventDefault();
		$(".statusp").html('').show();
		console.log($(".statusp").html());
        var user = {
			username : $("#employeeNumber_create").val(),
            cpassword : $("#loginPassword_create").val(),
            ccpassword : $("#cloginPassword_create").val(),
		};
		check_data(user,  "http://emmapp.us.openode.io/user/login");
    });

	function check_data(user, path)
	{
		var errors = [];

		Object.keys(user).forEach(function(key) {

			console.log(key, user[key]);
			console.log(user);
			if (key === "username" || key === "employee_id")
			{
				if (user[key].length < 7)
					errors.push("<strong>"+key+"</strong> too short");
				if (user[key].length > 7)
					errors.push("<strong>"+key+"</strong> too long");
			}
			else if (key === "password" || key === "cpassword" || key === "ccpassword")
			{
				if (user[key].length < 6)
					errors.push("<strong>Password</strong> too short");
				else if (user[key].length > 30)
					errors.push("<strong>Password</strong> too short");
			}
			else if (key === "first_name" || key === "last_name")
			{
				if (user[key].length < 2)
					errors.push("<strong>"+key+"</strong> too short");
				else if (user[key].length > 30)
					errors.push("<strong>"+key+"</strong> too long");
			}
			else if (key === "contact")
			{
				if (user[key].length > 10)
					errors.push("<strong>"+key+"</strong> too long");
				if (user[key].length < 10)
					errors.push("<strong>"+key+"</strong> too short");
				if (parseInt(user[key]).length > 10)
					errors.push("<strong>"+key+"</strong> Not valid");
			}
		});
		
		if (errors.length != 0)
		{
			var output= '';
			for (var i = 0; i < errors.length; i++)
			{
				output += `<div class="alert alert-warning no-margin no-padding">
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					${errors[i]}
				</div>`;
			}
			$(".status").html(output).delay(5000).fadeOut();
		}
		else
		{
			if ("cpassword" in user)
			{
				update_field('password',{
					username: user.username,
					password: user.ccpassword
				}, path);
			}
			else
				submit_data(user, path);
		}
	}

    function submit_data(user, path)
    {
        console.log("form submitted path = "+path);
        $.ajax({
            type : "POST",
            url : path,
            data : user,
            success : function(data) {
				data = JSON.parse(data);
				console.log(data);
                if (data.error.length > 0)
				{
					console.log("i have errors to print");
					var output = '';
					for (var i = 0; i < data.error.length; i++)
					{
						output += `<div class="alert no-margin no-padding">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							${data.error[i]}
						</div>`;
					}
					$(".status").html(output).delay(5000).fadeOut();
				}
				else if (data.status == -1)
				{
					//force user to change the password
					// alert("change password: Im working on it");
					// console.log($('#changePassBtn').text());
					// $('#myModal').modal('show');

					// alert('show Interface to create password');
						// console.log(username);
					$('#employeeNumber_create').val(user.username);
					$('#createPasswordBody').show().siblings().hide();
				}
				else if (data.status == 1)
				{
					$('#loginBody').hide();
					$('#dashboardBodyUser').show();
					$('#contentUser').show();
					window.user = user.username;
				}
				else if (data.status == 2)
				{
					console.log("returned status 2");
					$('#loginBody').hide();
					$('#dashboardBody').show();
					$('#content').show();
					window.user = user.username;
				}
				if (path === "http://emmapp.us.openode.io/user/register")
					$("#registerForm")[0].reset();
            }
        });
    }

	function update_field( name, user, path)
    {

        console.log(user);
        $.ajax({
            type : "POST",
            url : "http://emmapp.us.openode.io/user/update",
            data :{
				user : user.username,
				value : user.password
			},
            success : function() {
				console.log("register");
				console.log(user);
				submit_data(user, path);
            }
        });
    }

});
