$(document).ready(function(){
//  onclick="document.getElementById('body2').style.display = 'block';
//  document.getElementById('body1').style.display = 'none';"
//  $('#sidebar').addClass('active');


    $('#loginForm').submit(function(e){
        e.preventDefault();
        console.log("sending");
        if ($('#loginPassword').val() == 1)
        {
            $('#loginBody').hide();
            $('#dashboardBodyUser').show();
            $('#contentUser').show();
        }
        else
        {
            $('#loginBody').hide();
            $('#dashboardBody').show();
            $('#content').show();
        }
    //     $.ajax({
    //         type : "POST",
    //         url : 'http://192.168.43.152:8080/cordova',
    //         success : function(data) {
                
    //                 $('#loginBody').hide();
    //                 $('#dashboardBody').show();
    //                 $('#content').show();
                
    //         }
    //     });
    });

    $('.signOutBuutton').click(function(e){
        $('#sidebar').removeClass('active');  //close side bar
        $('#sidebarUser').removeClass('active');  //close side bar
        e.preventDefault();  //stop link from redirecting
        //clean all data stored on the local storage about the current user session;
        $('#content').hide();
        $('#contentUser').hide();
        $('.top_nav').hide();
        $('#loginBody').show().siblings().hide();
        console.log("sign out");
    });

    $('.userAccountsButton').click(function(){
        $('.top_nav').show();
        $('#sidebar').removeClass('active');  //close side bar
        $('#accountsBody').show().siblings().hide();
        console.log($('#accountsBody').siblings());
        
    });

    $('.dashboardButton').click(function(){
        $('.top_nav').hide();
        $('#sidebar').removeClass('active');  //close side bar
        $('#dashboardBody').show().siblings().hide();
    });

    $('.jobCardButton').click(function(){
        $('.top_nav').hide();
        $('#sidebar').removeClass('active');  //close side bar
        $('#jobCardBody').show().siblings().hide();
    });

    $('.assignedJobsButton').click(function(){
        $('#sidebarUser').removeClass('active');  //close side bar
        $('#assignedJobsBody').show().siblings().hide();
    });

    $('.helpButton').click(function(){
        $('.top_nav').hide();
        $('#sidebar').removeClass('active');  //close side bar
        $('#helpBody').show().siblings().hide();
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('#sidebarCollapseUser').on('click', function () {
        $('#sidebarUser').toggleClass('active');
    });

    $('.emm-body').click(function(){
        $('#sidebar').removeClass('active');
        $('#sidebarUser').removeClass('active');
    });

    // $('#sidebarCollapse').on('click', function () {
    //     // open or close navbar
    //     $('#sidebar').toggleClass('active');
    //     // close dropdowns
    //     $('.collapse.in').toggleClass('in');
    //     // and also adjust aria-expanded attributes we use for the open/closed arrows
    //     // in our CSS
    //     $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    // });

    $("#addJob-assign").on('change', function(e) {
        if (Object.keys($(this).val()).length > 3) {
            $('option[value="' + $(this).val().toString().split(',')[3] + '"]').prop('selected', false);
        }
    });
});