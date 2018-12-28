$(document).ready(function(){
    $('.job_modal').click(function () {
        var job_number = $(this).attr("data-job");
        $('#moda_card_number').text(job_number);
    });
});