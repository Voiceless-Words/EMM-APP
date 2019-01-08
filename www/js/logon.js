$(document).ready(function(){
  var request = indexedDB.open('formInputs', 1);

  request.onupgradeneeded = function(event){
    var db = event.target.result;
    if(!db.objectStoreNames.contains('formInputs')){
      var os = db.createObjectStore('formInputs', {keyPath: "id", autoIncrement: true});
      os.createIndex('name', 'name', {unique:false});
    }
  }
  //succes
  request.onsuccess = function(event){
    console.log('success database open');
    db = event.target.result;
  };
        //error
  request.onerror = function(event){
    console.log('error database not opened');
  };
});

$(document).ready(function(){
//  onclick="document.getElementById('body2').style.display = 'block';
//  document.getElementById('body1').style.display = 'none';"
//  $('#sidebar').addClass('active');
var boxCondition = [];

	$('#loginForm').submit(function(e){
		e.preventDefault();
		console.log("sending");

		var username = $('#employeeNumber').val();
		var password = $('#loginPassword').val();
    var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
   		if (this.readyState == 4 && this.status == 200) {

   				var response = JSON.parse(this.responseText);
   				console.log(response.status);

   				if (response.status == 2) {
   					$('#loginBody').hide();
					$('#dashboardBody').show();
					$('#content').show();
   				}
   				else if (response.status == 1) {
   					$('#loginBody').hide();
					$('#dashboardBodyUser').show();
					$('#contentUser').show();
   				}
   				else if (response.status == -1)
   				{
   					alert('show Interface to create password');
					   console.log(username);
					$('#employeeNumber_create').val(username);
					$('#createPasswordBody').show().siblings().hide();
   				}
   				else
   				{
   					alert('Incorrect Credentials');
   				}
   			}
		}
		xhttp.open("POST", "http://192.168.43.152:8080/user/login", true);
   		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   		xhttp.send('username='+username
   			+"&password="+password);
/*
*/
		if ($('#loginPassword').val() == 1)
		{
			$('#loginBody').hide();
			$('#dashboardBodyUser').show();
			$('#contentUser').show();
		}
		else
		{
			$('#loginBody').hide();
			$('#dashboardBody').show();
			$('#content').show();
		}
	//     $.ajax({
	//         type : "POST",
	//         url : 'http://192.168.43.152:8080/cordova',
	//         success : function(data) {

	//                 $('#loginBody').hide();
	//                 $('#dashboardBody').show();
	//                 $('#content').show();

	//         }
	//     });
	});

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
	});

	$('.userAccountsButton').click(function(){
		$('.top_nav').show();
		$('#sidebar').removeClass('active');  //close side bar
		$('#accountsBody').show().siblings().hide();

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
			electSecure : $('#electSecure :selected').text(),
			electDoor : $('#electDoor :selected').text(),
			electTransponder : $('#electTransponder :selected').text(),
			electDoorBypassed : $('#electDoorBypassed :selected').text(),
			battery : $('#battery :selected').text(),
			working : $('#working :selected').text(),
			remote : $('#remote :selected').text(),
		}
		$('#conditionA').hide().siblings().hide();
		$('.addCable').show().siblings().show();
		$('.markJobFinished').show();
		// console.log(conditionAData.boxDamage);
		jobs[jobNumber]['conditionAData'] = conditionAData;
		jobs[jobNumber]['conditionBData'] = conditionBData;
		console.log(jobs);
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
          url:"http://localhost:8080/form_save",
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
      console.log(jobNo);
      var stringD = JSON.stringify(jobs);

      /*$.ajax({
        url:"http://localhost:8080/form_save",
        data:{
          jobNo: jobNo,
          form:stringD
        },
        error: function () {
          console.log("Something wrong happened");
        },
        succes: function () {
          console.log("Successful ajax");
        },
        type: 'POST'
      });*/
      var transaction = db.transaction(["formInputs"], "readwrite");

      var store = transaction.objectStore("formInputs");

      //all the values goes here
      var formInput = jobs;

      var request = store.add(formInput);

      //onsuccess
      request.onsuccess = function(e){
        console.log("The form data was saved");
        window.location.href="localhost:81/www/index.html"
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

	// $('#sidebarCollapse').on('click', function () {
	//     // open or close navbar
	//     $('#sidebar').toggleClass('active');
	//     // close dropdowns
	//     $('.collapse.in').toggleClass('in');
	//     // and also adjust aria-expanded attributes we use for the open/closed arrows
	//     // in our CSS
	//     $('a[aria-expanded=true]').attr('aria-expanded', 'false');
	// });

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

});
