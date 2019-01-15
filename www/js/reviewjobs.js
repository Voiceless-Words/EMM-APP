function reviewjobs(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var reviewjobsarray = this.responseText;
    console.log(JSON.parse(reviewjobsarray));
  }
}
  xhttp.open("POST", "http://localhost/reviewjob", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send('view=data&format=JSON');
}
$(document).ready(function(){
// .JobCardReview
    $(document).on('click', ".JobCardReview", function(){
        $('.jobDisplay').text($(this).attr('data-jobNumber'));
    });
});
