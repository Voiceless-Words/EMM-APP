$('.add-one').click(function(){
  $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
  attach_delete();
});


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
      alert("in here bosso");
      $(".meterAvailable").hide();
    }
    else {
        $(".meterAvailable").show();
    }
    alert(val);
}
