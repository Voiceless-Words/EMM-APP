$(document).ready(function(){
    $('.statistics').click(function(){
		window.location.href = "statistics.html";
    });

    $('.listUsers').click(function(){
        getAllUsers(getUser('creator'));
    });
    countUsers(getUser('creator'));
});

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
            $('.countUsers').text(data.length);
        }
    });
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
            var users = `<table class="table table-sm my-4">
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
            for (let i = 0; i < data.length; i++)
            {
                line += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td>${data[i].first_name}</td>
                        <td>${data[i].last_name}</td>
                        <td>${data[i].employee_id}</td>
                        </tr>`;
            }
            users += line;
            users += `</tbody></table>`;
            $('.statsDisplay').html(users);
        }
    });
}