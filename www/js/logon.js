
$(document).ready(function(){
	$('#loginBody').show().siblings().hide();
	if (getUser('employee_id'))
	{
		if (getUser('admin') == 0)
		{
			$('#dashboardBodyUser').show().siblings().hide();
			$('#contentUser').show();
			window.user = getUser('employee_id');
			$('.firstName').text(getUser('first_name'));
			$('.lastName').text(getUser('last_name'));

		}
		else if (getUser('admin') == 1)
		{
			$('#dashboardBody').show().siblings().hide();
			$('#content').show();
			window.user = getUser('employee_id');
			$('.firstName').text(getUser('first_name'));
			$('.lastName').text(getUser('last_name'));
		}
	}


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

	var boxCondition = [];
	var riskTerms = 0;

	$('.signOutBuutton').click(function(e){
		$('#sidebar').removeClass('active');  //close side bar
		$('#sidebarUser').removeClass('active');  //close side bar
		e.preventDefault();
		// $('#content').hide();
		// $('#contentUser').hide();
		// $('.top_nav').hide();
		// $('#loginBody').show().siblings().hide();
		deleteUser();
        window.user = 0;
		// $("#loginForm")[0].reset();
		window.location.href = "index.html";
	});

	$('.userAccountsButton').click(function(){
		$('.top_nav').show();
		$('#sidebar').removeClass('active');  //close side bar
		// $('#accountsBody').show().siblings().hide();
		window.location.href = "accounts.html";
	});

	$('.adminProfile').click(function(){
		$('.top_nav').show();
		$('#sidebar').removeClass('active');  //close side bar
		// $('#adminProfile').show().siblings().hide();
		console.log("go to adminProfile.html");
		window.location.href = "adminProfile.html";

	});

	$('.dashboardButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		// $('#dashboardBody').show().siblings().hide();
		window.location.href = "adminDash.html";
	});

	$('.dashboardUserButton').click(function(){
		$('.top_nav').hide();
		$('#sidebarUser').removeClass('active');  //close side bar
		// $('#dashboardBodyUser').show().siblings().hide();
		window.location.href = "userDash.html";
	});

	$('.jobCardButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		$('#jobCardBody').show().siblings().hide();
	}); //delete ?

	$('.userProfileSettings').click(function(){
		$('#sidebarUser').removeClass('active');  //close side bar
		// $('#userProfileSettings').show().siblings().hide();
		window.location.href = "userProfile.html";
	});

	$('.startJob').click(function(){
		$('#sidebarUser').removeClass('active');  //close side bar
		$('#startJob').show().siblings().hide();
		window.location.href = "startjob.html";
	});

	$('.helpButton').click(function(){
		$('.top_nav').hide();
		$('#sidebar').removeClass('active');  //close side bar
		// $('#helpBody').show().siblings().hide();
		window.location.href = "help.html";
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
	});

	$('#riskForm').submit(function(e){
		e.preventDefault();
		riskTerms = ($("#riskCheck").is(':checked')) ? 1 : 0;
		if (riskTerms)
		{
			$('#conditionButton').hide();
			$('#conditionA').show().siblings().hide();
		}
		else{
			alert("please accept the risk assessment terms before you can continue...");
		}
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
				$.ajax({
					type : "POST",
					url : "http://emmapp.us.openode.io/jobcard_save",
					data : newJob,
					success : function(data) {
						console.log(data);
					}
				});
				$('#createJobForm')[0].reset();

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
				cablesObj = [];
				cableCount = 0;
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
		cablesObj = [];
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
	$('.usersJobCard').click(function(){
		$('#addCableForm').hide();
		$('.formContainer').show();
		console.log("runs");
		console.log('rski', riskTerms);
		if (riskTerms)
		{
			console.log('rski', riskTerms);


			// console.log(typeof conditionAData);
			// console.log($(this).text());
			if (conditionAData)
			{
				$('#conditionButton').show().siblings().show();
				$('.markJobFinished').show();
				$('#conditionA').hide().siblings().hide();
			}
			else {
				$('#conditionA').show();
			}
			if (jobNumber != 0 && jobNumber != $(this).attr("data-job-number") && conditionAData)
			{
				alert("Please finish Job "+ jobNumber +" before doing other jobs");
				$('.bd-example-modal-lg').hide();
			}else{
				jobNumber = $(this).attr("data-job-number");
				jobs[jobNumber] = {};
				jobs['status'] = 0;
			}
		}
		else{
			if (jobNumber != 0 && jobNumber != $(this).attr("data-job-number") && conditionAData)
			{
				alert("Please finish Job "+ jobNumber +" before doing other jobs");
				$('.bd-example-modal-lg').hide();
			}else{
				jobNumber = $(this).attr("data-job-number");
				jobs[jobNumber] = {};
				jobs['status'] = 0;
			}
			console.log("should just be showing risk");
			$('#riskForm').show().siblings().hide();
			console.log(jobNumber);
			console.log( $(this).attr("data-job-number"));
			$('#addCableForm')[0].reset();
			$('.jobDisplay').text(jobNumber);
		}
	});

	var cableCount = 0;
	var cablesObj = [];

	$('.addCable').click(function(){
		$(this).hide();
		selectedCable = -1;
		cableCount++;
		$('#addCableForm').show();
		$('#conditionButton').hide();

		$('.formContainer').show().siblings().hide();
		$('.markJobFinished').hide();
	});

	$('#addCableForm').submit(function (e) {
		e.preventDefault();
		var name = cableCount;
		console.log(`name = ${name}`);
		console.log(`selectedCable = ${selectedCable}`);
		//cablesObj['cableCount'] = cableCount;
		if (selectedCable > -1)
		{
			cablesObj[selectedCable] = {
				name: "cable"+cableCount,
				correct : $('#correct :selected').text(),
				tag : $('#tag :selected').text(),
				label : $('#label :selected').text(),
				breakerCondition: $('#breaker : selected').text(),
				fitted : $('#fitted :selected').text(),
				size : $('#size :selected').text(),
				sizeOther:$('#sizeOther :selected').text(),
				meter : $('#meter :selected').val(),
				meterSeals : $('#meterSeals :selected').val(),
				meterSealsColour : $('#meterSealsColour :selected').val(),
				meterBypassed : $('#meterBypassed :selected').val(),
				standConnected : $('#standConnected').val(),
			};
		}
		else{
			cablesObj.push({
				name: "cable"+cableCount,
				correct : $('#correct :selected').text(),
				tag : $('#tag :selected').text(),
				label : $('#label :selected').text(),
				breakerCondition: $('#breaker : selected').text(),
				fitted : $('#fitted :selected').text(),
				size : $('#size :selected').text(),
				sizeOther : $('#sizeOther :selected').text(),
				meter : $('#meter :selected').val(),
				meterSeals : $('#meterSeals :selected').val(),
				meterSealsColour : $('#meterSealsColour :selected').val(),
				meterBypassed : $('#meterBypassed :selected').val(),
				standConnected : $('#standConnected').val(),
			});
			var current = $('.cables').html();
			current += `<div class="col-12 btn btn-primary mt-2 mb-2 text-center cableSelect" data-cableName="${name}"><strong>Cable ${name}</strong></div>`;

		}
		$('.cables').html(current);
		$('.addCable').show().siblings().show();
		$('#addCableForm').hide();
		$('#addCableForm')[0].reset();
		$('.markJobFinished').show();
		console.log(cablesObj);
	});
var selectedCable = -1;
	$(document).on('click', ".cableSelect", function(){
		var name = $(this).attr("data-cableName") - 1;
		selectedCable = name;
		console.log(cablesObj);
		$("#correct option[value="+ cablesObj[name].correct +"]").prop('selected', 'selected');
		$("#tag option[value="+ cablesObj[name].tag +"]").prop('selected', 'selected');
		$("#label option[value="+ cablesObj[name].label +"]").prop('selected', 'selected');
		$("#breaker option[value="+ cablesObj[name].breakerCondition +"]").prop('selected', 'selected');
		$("#fitted option[value="+ cablesObj[name].fitted +"]").prop('selected', 'selected');
		$("#size option[value="+ cablesObj[name].size +"]").prop('selected', 'selected');
		$("#meter option[value="+ cablesObj[name].meter +"]").prop('selected', 'selected');

		if(cablesObj[name].size === "Other")
		{
			$('#sizeOther').val(cablesObj[name].sizeOther);
		}
		
		if (cablesObj[name].meter != "NA")
		{
			$("#meterSeals option[value="+ cablesObj[name].meterSeals +"]").prop('selected', 'selected');
			$("#meterSealsColour option[value="+ cablesObj[name].meterSealsColour +"]").prop('selected', 'selected');
			$("#meterBypassed option[value="+ cablesObj[name].meterBypassed +"]").prop('selected', 'selected');
		}
		$("#standConnected").val(cablesObj[name].standConnected);

		$('#addCableForm').show();
		$('.formContainer').show().siblings().hide();
		$('.markJobFinished').hide();
	});

	$("#addJob-assign").on('change', function(e) {
		if (Object.keys($(this).val()).length > 3) {
			$('option[value="' + $(this).val().toString().split(',')[3] + '"]').prop('selected', false);
		}
	}); //delete

	$('#plinthCondition').change(function(){
		if($('#plinthCondition :selected').text() === "No")
			$('.plinthDefectParent').show(600);
		else
			$('.plinthDefectParent').hide();
	});

	$('#size').change(function(){
		if($('#size :selected').text() === "Other")
			$('#sizeOther').show();
		else
			$('#sizeOther').hide();
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
			creator: window.user,
			admin: $('#adminSetting').is(':checked') ? 1 : 0
		};
		console.log(user);
		check_data(user,  "http://emmapp.us.openode.io/user/register");
    });

	$("#createPasswordForm").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
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
					$('#employeeNumber_create').val(user.username);
					// $('#createPasswordBody').show().siblings().hide();
					window.location.href = "createPasswordBody.html";
				}
				else if (data.status == 1)
				{
					// $('#dashboardBodyUser').show().siblings().hide();
					$('#contentUser').show();
					window.user = user.username;
					storeUser(data.user[0]);
					$('.firstName').text(getUser('first_name'));
					$('.lastName').text(getUser('last_name'));
					window.location.href = "userDash.html";
				}
				else if (data.status == 2)
				{
					$('#dashboardBody').show().siblings().hide();
					$('#content').show();
					window.user = user.username;
					storeUser(data.user[0]);
					$('.firstName').text(getUser('first_name'));
					$('.lastName').text(getUser('last_name'));
					window.location.href = "adminDash.html";
				}
				if (path === "http://emmapp.us.openode.io/user/register")
					$("#registerForm")[0].reset();
            }
        });
    }

	function update_field( name, user, path)
    {
        $.ajax({
            type : "POST",
            url : "http://emmapp.us.openode.io/user/update",
            data :{
				user : user.username,
				value : user.password
			},
            success : function(data) {
				submit_data(user, path);
            }
        });
    }

});
	function storeUser(user)
	{
		var currentUser = JSON.stringify(user);
		localStorage.setItem('currentUser', currentUser);
	}

	function getUser(field)
	{
		if (localStorage.hasOwnProperty('currentUser'))
		{
			var user = JSON.parse(localStorage.getItem('currentUser'));
			return user[field];
		}
		else
			return null;
	}

	function deleteUser()
	{
		localStorage.removeItem('currentUser');
	}
