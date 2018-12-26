$(document).ready(function () {
    $("#searchForm").submit(function (e) {
        e.preventDefault();
        var value = $("#searchField").val();
        searchFor(value);
    });

    function searchFor(value)
    {
         $.ajax({
            type : "POST",
            url : "../../search/search",
            data : {
                search : value
            },
            success : function(data) {
				// data = JSON.parse(data);
                console.log(data.length);
                var output = `<div class="row">
                                <div class="col-sm-4"><strong>First Name</strong></div>
                                <div class="col-sm-4"><strong>Last Name</strong></div>
                                <div class="col-sm-4"><strong>Employee NO:</strong></div><hr>`;
                for(var i = 0; i < data.length; i++)
                {
				    console.log(data[i]);
                    output +=   `<div class="col-sm-4">${data[i].first_name}</div>
                                <div class="col-sm-4">${data[i].last_name}</div>
                                <div class="col-sm-4">${data[i].employee_id}</div>`;

                }
                output += `</div>`;
                $("#workspace").html(output);
            }
        });
    }
});