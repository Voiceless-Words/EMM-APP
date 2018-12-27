

//Attach functionality to delete buttons
function attach_delete(){
  $('.delete').off();
  $('.delete').click(function(){
    console.log("click");
    $(this).closest('.form-group').remove();
  });
}

function meterSelectCheck(nameSelect)
{
    var val = nameSelect.value;
    if (val === "NA")
    {
      $(".meterAvailable").hide();
    }
    else {
        $(".meterAvailable").show();
    }
}
