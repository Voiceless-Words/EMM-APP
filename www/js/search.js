$(document).ready(function(){
    $('#searchReview').submit(function(e){
        e.preventDefault();
        console.log("search.js");
    });
    $("#searchReview").on("input", function () {
        // searchFor( $("#searchField").val());
    });
});