var i = 1;
var j = 1;
function add(){
  $('#meterC'+(i - 1)).attr('id', 'meterC'+ i);
  $('#meterA'+(i - 1)).attr('class','meterAvailable'+ i);
  $('#cableNumber'+(i - 1)).attr('id','cableNumber'+ i);
  $('#meterCheck'+(i - 1)).attr('id','meterCheck'+ i);
  $('#cable'+(i - 1)).attr('id','cable'+ i);
  $('#meterA'+(i - 1)).attr('id','meterA'+ i);
  $('#meterA' + i).css('display', 'none');
  $('#delete' +(i - 1)).attr('id', 'delete' + i);
  $('#cableNumber' + i).html(i);
  $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
  attach_delete();
  i++;
}
function addRisk(){
  $('#risk' + (j - 1)).attr('id', 'risk' + j);
  $('#delete' +(j - 1)).attr('id', 'delete' + j);
  $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
  attach_delete();
}
//Attach functionality to delete buttons
function attach_delete(){
  $('.delete').off();
  $('.delete').click(function(){
    console.log("click");
    $(this).closest('.form-group').remove();
    if(i !== 1)
    {
      i--;
    }
    if(j !== 1)
    {
      j--;
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
      $('#meterC' + l).prop('disabled', true);
    }
    else {
        $(".meterAvailable" + l).show();
        $('#meterC' + l).prop('disabled', false);
    }
}
function plinth(elem){
  var val = elem.value;
  if(val === 'NO')
  {
    $("#plinth").hide();
    $("#plinthV").prop('disabled', true);
  }
  else {
    $("#plinth").show();
    $("#plinthV").prop('disabled', false);
  }
}

function plinthCondition(elem){
  var val = elem.value;
  if(val === 'YES')
  {
    $("#plinthCondition").hide();
    $("#plinthC").prop('disabled', true);
  }
  else {
    $("#plinthCondition").show();
    $("#plinthC").prop('disabled', false);
  }
}

function electronics(elem){
  var val = elem.value;
  if(val === 'NO')
  {
    $("#electronics").hide();
    $("#elec").prop('disabled', true);
  }
  else {
    $("#electronics").show();
    $("#elec").prop('disabled', false);
  }
}
