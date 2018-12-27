var i = 1;
function add(){
  $('.cableNumber').html(i);
  $('#meterA'+(i - 1)).attr('class','meterAvailable'+ i);
  $('#meterCheck'+(i - 1)).attr('id','meterCheck'+ i);
  $('#cable'+(i - 1)).attr('id','cable'+ i);
  $('#meterA'+(i - 1)).attr('id','meterA'+ i);
  $('#meterA' + i).css('display', 'none');
  $('#delete' +(i - 1)).attr('id', 'delete' + i);
  $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
  attach_delete();
  i++;
}

//Attach functionality to delete buttons
function attach_delete(eleId){

  $('.delete').off();
  $('.delete').click(function(){
    console.log("click");
    var k = 0;
    var l = "";
    $string = $(this).attr('id');
    while ($string[k]) {
      if ($string[k] >= '1' && $string[k] <= '9'){
        l = l + $string[k];
      }
      k++;
    }
    $(this).closest('#cable' + l).remove();
    if(i !== 1)
    {
      i--;
    }
  });
}

function meterSelectCheck(nameSelect)
{
    var val = nameSelect.value;
    var string = nameSelect.id;
    var k = 0;
    var l = "";
    while (string[k]) {
      if (string[k] >= '1' && string[k] <= '9'){
        l = l + string[k];
      }
      k++;
    }
    if (val === "NA")
    {
      $(".meterAvailable" + l).hide();
    }
    else {
        $(".meterAvailable" + l).show();
    }
}
