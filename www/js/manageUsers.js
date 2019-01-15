// $(document).ready(function () {
//     $("#registerForm").submit(function (e) {
//         e.preventDefault();
// 		$(".status").html('').show();
// 		console.log($(".status").html());
//         var adminVal = 0;
//         if($("#adminSetting").is(':checked'))
//             adminVal = 1;
//         else
//             adminVal = 0;
//         var user = {
// 			employee_id : $("#regEmployeeNumber").val(),
//             first_name : $("#firstName").val(),
//             last_name : $("#lastName").val(),
//             contact : $("#contactNumber").val(),
//             admin : adminVal,
//             password :123456
// 		}
//         // console.log(user);
//         submit_data(user, "http://localhost/user/register");
//     });

//     function submit_data(user, path)
//     {
//         console.log("form submitted");
//         $.ajax({
//             type : "POST",
//             url : path,
//             data : user,
//             success : function(data) {
// 				data = JSON.parse(data);
// 				console.log(data);
//                 if (data.error.length > 0)
// 				{
// 					var output = '';
// 					for (var i = 0; i < data.error.length; i++)
// 					{
// 						output += `<div class="alert no-margin no-padding">
// 							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
// 							${data.error[i]}
// 						</div>`;
// 					}
// 					$(".status").html(output).delay(5000).fadeOut();
// 				}
// 				else if (data.status == -1)
// 				{
// 					//force user to change the password
// 					// alert("change password: Im working on it");
// 					console.log($('#changePassBtn').text());
// 					$('#myModal').modal('show');
// 				}
// 				else if (data.status == 1)
// 					window.location = "http://localhost/dashboardb";
// 				else if (data.status == 2)
// 					window.location = "http://localhost/dashboarda";
// 				if (path === "http://localhost/user/register")
// 					$("#registerForm")[0].reset();
//             }
//         });
//     }
// });
