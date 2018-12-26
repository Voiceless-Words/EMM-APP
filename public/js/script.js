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

    $("#login_form").submit(function (e) {
        e.preventDefault();
		$(".status").html('').show();
		console.log($(".status").html());
        var username = $("#login_user").val(),
            password = $("#login_password").val();
			if (check_login(username, password))
            	submit_login(username, password);
    });

	function check_login(username, password)
	{
		var errors = [],
			employee_len = 7; //this is the standard len of their employee number;
		
		if (username.length < employee_len)
			errors.push("<strong>Username</strong> too short");
		if (username.length > employee_len)
			errors.push("<strong>Username</strong> too long");
		if (password.length < 8)
			errors.push("<strong>Password</strong> too short");
		if (password.length > 20)
			errors.push("<strong>Password</strong> too long");
			//will do the strength as well
		if (errors.length != 0)
		{
			var output= '';
			for (var i = 0; i < errors.length; i++)
			{
				output += `<div class="alert no-margin no-padding">
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					${errors[i]}
				</div>`;
			}
			$(".status").html(output).delay(5000).fadeOut();
			return 0;
		}
		return 1;
	}

    function submit_login(username, password)
    {
        console.log("form submitted");
        $.ajax({
            type : "POST",
            url : "../../user/login",
            data : {
                username : username,
                password : password
            },
            success : function(data) {
				data = JSON.parse(data);
                if (data.status == 0)
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
				else if (data.status == 1)//user
					window.location = "../../dashboarda";
				else if (data.status == 2)//admin
					window.location = "../../dashboardb";
            }
        });
    }

});
