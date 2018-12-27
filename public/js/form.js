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
    var val = nameSelect.options[nameSelect.selectedIndex].value;
    document.getElementById("meterAvailable").style.display = val == 'NA' ? 'none' : "block";
}
