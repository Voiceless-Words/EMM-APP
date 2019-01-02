$(document).ready(function(){
  var request = indexedDB.open('customers', 1);

  request.onupgradeneeded = function(event){
    var db = event.target.result;
    if(!db.objectStoreNames.contains('customers')){
      var os = db.createObjectStore('customers', {keyPath: "id", autoIncrement: true});
      os.createIndex('name', 'name', {unique:false});
    }
  }
  //succes
  request.onsuccess = function(event){
    console.log('succes');
    db = event.target.result;
        //show customers
        showCustomers(db);
  };
        //error
  request.onerror = function(event){
    console.log('error database not opened');
  };
});

//check for internet connection
function callThis(){
  if(navigator.onLine)
  {
    console.log("You are on the line");
  }
  else{
    var j = 0;
    var formInput={};
    var formArray=[];
    var myForm = document.forms.myForm;
    var correct = myForm.elements['cable[]'];
    var tag = myForm.elements['tag[]'];
    var label = myForm.elements['label[]'];
    var fitted = myForm.elements['fitted[]'];
    var size = myForm.elements['size[]'];
    var meter = myForm.elements['meter[]'];
    var meterSeals = myForm.elements['meterSeals[]'];
    var meterSealsColour = myForm.elements['meterSealsColour[]'];
    var meterBypassed = myForm.elements['meterBypassed[]'];
    var stand_no = myForm.elements['stand_no[]'];
    var boxDoor = myForm.elements['boxDoor[]'];
    var boxDamage = myForm.elements['boxDamage[]'];
    var plinthVisible = myForm.elements['plinthVisible[]'];
    var plinthConditions = myForm.elements['plinthConditions[]'];
    var plinthDefect = myForm.elements['plinthDefect[]'];
    var electronic = myForm.elements['electronic[]'];
    var electSecure = myForm.elements['electSecure[]'];
    var electDoor = myForm.elements['electDoor[]'];
    var electTransponder = myForm.elements['electTransponder[]'];
    var electDoorBypassed = myForm.elements['electDoorBypassed[]'];
    var battery = myForm.elements['battery[]'];
    var working = myForm.elements['working[]'];
    var remote = myForm.elements['remote[]'];

    for (var i = 0; i < correct.length; i++) {
      formInput.cable = correct[i].value;
      formInput.tag = tag[i].value;
      formInput.label = label[i].value;
      formInput.fitted = fitted[i].value;
      formInput.size = size[i].value;
      formInput.meter = meter[i].value;
      if (meter[j].value === "YES" || meter[j].value === "NO")
      {
        formInput.meterSeals = meterSeals[j].value;
        formInput.meterSealsColour = meterSealsColour[j].value;
        formInput.meterBypassed = meterBypassed[j].value
        j++;
      }
      formInput.stand_no = stand_no[i].value;
      formArray.push(formInput);
    }
    formInput = {};
    formInput.boxDoor = boxDoor.value;
    formInput.boxDamage = boxDamage.value;
    formInput.plinthVisible = plinthVisible.value;
    if(plinthVisible.value === "YES")
    {
      formInput.plinthCondition = plinthConditions.value;
      if (plinthConditions.value === "NO") {
        formInput.plinthDefect = plinthDefect.value;
      }
    }
    formInput.electronic = electronic.value;
    if(electronic.value === "YES")
    {
      formInput.electSecure = electSecure.value;
      formInput.electDoor = electDoor.value;
      formInput.electTransponder = electTransponder.value;
      formInput.electDoorBypassed = electDoorBypassed.value;
      formInput.battery = battery.value;
      formInput.working = working.value;
      formInput.remote = remote.value;
    }
    formArray.push(formInput)
    console.log( JSON.stringify(formArray));
    var transaction = db.transaction(["customers"], "readwrite");

    var store = transaction.objectStore("customers");
    var customer = {
      name: name,
      email: email
    }

    var request = store.add(JSON.stringify(formArray));

        //onsuccess
    request.onsuccess = function(e){
      window.location.href="index.html"
    }

        //error
      request.onerror = function(e){
        alert("sorry user was not added");
        console.log('Error', e.target.error.name);
      }
    console.log("you are off the line");
  }
}

(function(){
  'use strict';
  if(!('indexedDB' in window)){
    console.log('This browser does\'t support IndexedDB');
    return;
  }
  else {
    console.log('You can add your database things man it\'s supported');
  }
  var dbPromise = window.indexedDB.open('test-db', 1);
  var db;

  dbPromise.onsuccess = function(event){
    console.log('[onsuccess]', dbPromise.result);
    db = event.target.result;
  };

  dbPromise.onerror = function(event){
    console.log('[onerror]', dbPromise.console.error);
  };

  dbPromise.onupgradeneeded = function(event){
    var db = event.target.result;
    var store = db.createObjectStore('formsDone', {keyPath: 'id'});
  }
})();

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
