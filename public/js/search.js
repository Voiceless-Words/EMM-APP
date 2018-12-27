$(document).ready(function () {
    //search button clicked
    $("#searchForm").submit(function (e) {
        e.preventDefault();
        searchFor( $("#searchField").val());
    });

    //input value changed
    $("#searchForm").on("input", function () {
        searchFor( $("#searchField").val());
    });

    //click the search result
    $(document).on('click', ".search_result", function(){
        getAllUserInfo($(this).attr("data-employee"));
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
                var output = `<div class="row">
                                <div class="col-sm-4"><strong>First Name</strong></div>
                                <div class="col-sm-4"><strong>Last Name</strong></div>
                                <div class="col-sm-4"><strong>Employee NO:</strong></div><hr>`;
                for(var i = 0; i < data.count; i++)
                {
                    output +=   `<div class="col-sm-12 row search_result" data-employee="${data.data[i].employee_id}">
                                    <div class="col-sm-4">${data.data[i].first_name}</div>
                                    <div class="col-sm-4">${data.data[i].last_name}</div>
                                    <div class="col-sm-4">${data.data[i].employee_id}</div>
                                </div>`;

                }
                output += `</div>`;
                $("#workspace").html(output);
            }
        });
    }

    function getAllUserInfo(user)
    {
         $.ajax({
            type : "POST",
            url : "../../search/all",
            data : {
                user : user
            },
            success : function(data) {
				// data = JSON.parse(data);
                console.log(data);
                
                // $("#workspace").html(output);
            }
        });
    }
});