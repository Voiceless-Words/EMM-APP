function getview() {
		var workspace = document.getElementById('workspace');
		console.log(event.target.value);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
   		if (this.readyState == 4 && this.status == 200) {
   				workspace.innerHTML = this.responseText;
   			}
		}
		xhttp.open("POST", "/getview", true);
   		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   		xhttp.send('view='+event.target.value);
    		
    }


$(document).ready(function(){
    $("#loginForm").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
        var user = {
			username : $("#login_user").val(),
            password : $("#login_password").val()
		};
		check_data(user,  "../../user/login");
    });

	$("#registerForm").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
        var user = {
			employee_id : $("#regEmployeeId").val(),
            first_name : $("#regFirstName").val(),
            last_name : $("#regLastName").val(),
            contact : $("#regContactNumbers").val(),
            password : $("#regPassword").val()
		}

		check_data(user,  "../../user/register");
    });

	function check_data(user, path)
	{
		var errors = [];

		Object.keys(user).forEach(function(key) {

			console.log(key, user[key]);
			if (key === "username" || key === "employee_id")
			{
				if (user[key].length < 7)
					errors.push("<strong>"+key+"</strong> too short");
				if (user[key].length > 7)
					errors.push("<strong>"+key+"</strong> too long");
			}
			else if (key === "password")
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
			submit_data(user, path);
	}

    function submit_data(user, path)
    {
        console.log("form submitted");
        $.ajax({
            type : "POST",
            url : path,
            data : user,
            success : function(data) {
				data = JSON.parse(data);
				console.log(data);
                if (data.error.length > 0)
				{
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
				else if (data.status == 1)
					window.location = "../../dashboardb";
				else if (data.status == 2)
					window.location = "../../dashboarda";
				$("#registerForm")[0].reset();
            }
        });
    }

});
