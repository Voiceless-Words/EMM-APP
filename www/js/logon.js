$(document).ready(function(){
//  onclick="document.getElementById('body2').style.display = 'block';
//  document.getElementById('body1').style.display = 'none';"
//  $('#sidebar').addClass('active');
var boxCondition = [];

	$('#loginForm').submit(function(e){
		e.preventDefault();
		console.log("sending");
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
		$('#conditionA').hide();
		$('#conditionB').hide();
		$('#conditionButton').show();
		$('.addCable').show();
		$('.markJobFinished').show();
		// console.log(conditionAData.boxDamage);
		console.log($('#plinthDefect').text());
		jobs[jobNumber]['conditionAData'] = conditionAData;
		jobs[jobNumber]['conditionBData'] = conditionBData;
		console.log(jobs);
	});

	$('.markJobFinished').click(function(){
		// select where data-jobNumber == jobNumber and set disabled to true
		jobs['status'] = 1;
		jobs[jobNumber]['cables'] = cablesObj;
		console.log(jobs);
		var clean;
		conditionAData = clean;
		conditionBData = clean;
		cableCount = 0;
		cableCount = clean;
		$('#conditionButton').hide();
		$('#conditionA').show();
		$('.addCable').hide();
		$('.cables').hide();
		$('.markJobFinished').hide();
		$('.closeModal').click();
		$('[data-jobNumber="'+jobNumber).hide()+'"]';
	});
var jobNumber = 0;
	$('.userJobCard').click(function(){
		$('#addCableForm').hide();
		console.log(typeof conditionAData);
		if (conditionAData)
		{
			$('#conditionButton').show();
			$('#conditionA').hide();
			$('.addCable').show();
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
	});

	var cableCount = 0;
	var cablesObj = {};
	var name;

	$('.addCable').click(function(){
		$(this).hide();
		cableCount++;
		name = "cable"+cableCount;
		$('#addCableForm').show();
		$('#conditionButton').hide();
		
	});
	
	$('#addCableForm').submit(function (e) {
		e.preventDefault();
		cablesObj['cableCount'] = cableCount;
		cablesObj[name] = {
			correct : $('#correct :selected').text(),
			tag : $('#tag :selected').text(),
			label : $('#label :selected').text(),
			fitted : $('#fitted :selected').text(),
			size : $('#size :selected').text(),
			meter : $('#meter :selected').text(),
			meterSeals : $('#meterSeals :selected').val(),
			meterSealsColour : $('#meterSealsColour :selected').val(),
			meterBypassed : $('#meterBypassed :selected').val(),
			standConnected : $('#standConnected').val(),
		};
		var current = $('.cables').html();
		current += `<div class="col-12 btn btn-primary mt-2 mb-2 text-center"><strong>${name}</strong></div>`;
		$('.cables').html(current);
		$('#conditionButton').show();
		$('.addCable').show();
		$('#addCableForm').hide();
		console.log(cablesObj);
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