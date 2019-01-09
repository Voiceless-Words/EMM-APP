$(document).ready(function(){
    var user;
    $('#changeAdminFirstName').submit(function(e){
        user = $('#employeeNumber').val();
        console.log(user);
        e.preventDefault();
        console.log('attempting change');
        if ($('#adminFirstName').val().length > 5)
        {
            changeField('first_name', $('#adminFirstName').val());
        }
        else
            errorOut("The First Name provided was too short", $('.fnameStatus'));
    });
    $('#changeAdminLastName').submit(function(e){
        user = $('#employeeNumber').val();
        console.log(user);
        e.preventDefault();
        if ($('#adminLastName').val().length > 5)
        {
            changeField('last_name', $('#adminLastName').val());
        }
        else
            errorOut("The Last Name provided was too short", $('.lnameStatus'));
    });

    function changeField(name, value)
    {
        console.log(user);
        $.ajax({
            type : "POST",
            url : 'http://localhost:8080/data/update_field',
            data : {
                name : name,
                value : value,
                id : user
            },
            success : function(data) {
                console.log(data);
            }
        });
    }
    function errorOut(err, out)
    {
        //err is the error u what to print
        //out is the place where u want the error to show
        out.html(err);
    }
});