function getview() {
		var workspace = document.getElementById('workspace');
		console.log(event.target.value);

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
   		if (this.readyState == 4 && this.status == 200) {
   				workspace.innerHTML = this.responseText;
   				$('#datepicker').datepicker({
            		uiLibrary: 'bootstrap4'
        		});
   			}
		}
		xhttp.open("POST", "/getview", true);
   		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   		xhttp.send('view='+event.target.value);
    		
    }

function getdescriptions(assets) {

	var	desc = document.getElementById('asset_description');
	var assetname = document.getElementById('asset_name');

	desc.innerHTML ='<i>no asset selected</i>';
	for (i = 0; i < assets.length; i++) { 

  		if (assets[i].name == assetname.value) {
			desc.innerHTML = assets[i].description;
			break;		
		}
	}

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

	$("#passwordForm").submit(function (e) {
        e.preventDefault();
		$(".statusp").html('').show();
		console.log($(".statusp").html());
        var user = {
			username : $("#login_user").val(),
            cpassword : $("#cpassword").val(),
            ccpassword : $("#ccpassword").val(),
		};
		check_data(user,  "../../user/login");
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
				else if (data.status == -1)
				{
					//force user to change the password
					// alert("change password: Im working on it");
					console.log($('#changePassBtn').text());
					$('#myModal').modal('show');
				}
				else if (data.status == 1)
					window.location = "../../dashboardb";
				else if (data.status == 2)
					window.location = "../../dashboarda";
				if (path === "../../user/register")
					$("#registerForm")[0].reset();
            }
        });
    }
	function update_field( name, user, path)
    {

        console.log(user);
        $.ajax({
            type : "POST",
            url : "../../user/update",
            data :{
				user : user.username,
				value : user.password
			},
            success : function() {
				console.log("register");
				submit_data(user, path);
            }
        });
    }

});
