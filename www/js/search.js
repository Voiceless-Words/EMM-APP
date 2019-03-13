$(document).ready(function(){
    // searchReview
    $("#jobCardSearch").on("input", function () {
        filter();
    });

    $("#searchReview").on("submit", function (e) {
        e.preventDefault();
        filter();
    });

    function filter(){


        var dd = (String(new Date().getDate()).length == 1) ? "0"+(new Date().getDate()) : (new Date().getDate());
        var mm = (String(new Date().getMonth() + 1).length == 1) ? "0"+(new Date().getMonth() + 1) : (new Date().getMonth() + 1); //January is 0!
        var yyyy = new Date().getFullYear();
        var today = `${yyyy}-${mm}-${dd}`;

        var start = ($('#cardStart').val()) ? $('#cardStart').val() : '2019-01-10';
        var end = (!$('#cardEnd').val()) ? today : $('#cardEnd').val();
        var valid = (end >= start) ? 1 : 0;
        console.log(end);
        if (valid){
            var filters = {
                search : $('#jobCardSearch').val(),
                start : start,
                end : end,
                id : window.user
            };
// (2019,0,13)
        }
        searchReview(filters);
    }

    function searchReview(filters){
        var output = `<h2 class="text-center">searching . . .</h2>`;
        $('.jobSearchResults').html(output);
         $.ajax({
            type : "POST",
            url : 'http://localhost:8080/search/reviewJob',
            data : filters,
            success : function(data) {
                // console.log(data[0]['jobnumber']);
                output = `<h2 class="text-center">${data.length} match</h2>`;
                var len = data.length;
                for (var i = 0; i < len; i++)
                {
                    output += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start lightT JobCardReview" data-toggle="modal" data-target=".reviewModal" data-jobNumber="${data[i]['jobnumber']}">
                                <div class="d-flex w-100 justify-content-between">
                                    <span class="mb-1">Job Number : ${data[i]['jobnumber']}</span>
                                    <small>3 days ago</small>
                                </div>
                                <strong class="mb-1">Assigned to</strong>
                                <div class="d-flex w-100 justify-content-between">
                                    <span>Dora</span><span>Sofia</span><span>Elsa</span>
                                </div>
                                <p>Primary Substation Inspection</p>
                                <p>status : closed -> by ${data[i]['completedby']}</p>
                                <small>Due Date: 23/05/19</small>
                            </a>`;
                }
                $('.jobSearchResults').html(output);
            }
        });
    }
});
