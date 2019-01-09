$(document).ready(function(){
    $("#searchReview").on("input", function () {
        searchReview( $("#jobCardSearch").val());

    });

    function searchReview(value){
        var output = `<h2 class="text-center">searching . . .</h2>`;
        $('.jobSearchResults').html(output);
         $.ajax({
            type : "POST",
            url : 'http://192.168.1.100:8080/search/reviewJob',
            data : {
                value : value,
                id : window.user
            },
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
