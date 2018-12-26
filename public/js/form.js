$(document).ready(function () {
    //@naresh action dynamic childs
    var next = 0;
    $("#add-more").click(function(e){
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field'+ next +'" name="field'+ next +'"><!-- option select--><div class="form-group"> <label class="col-md-4 control-label" for="correct">Correctly Placed, <span>(on the cable at the top or bottom)?</span> <b>Cable '+ (next + 1)+'</label> <div class="col-md-5"> <select class="form-control"><option value="YES">YES</option><option value="NO">NO</option></select> </div></div><br><br> <!-- option select--><div class="form-group"> <label class="col-md-4 control-label" for="secure">Securely Placed, <span>(Tag fitted)?</label> <div class="col-md-5"> <select class="form-control"><option value="YES">YES</option><option value="NO">NO</option></select> </div></div><br><br><!-- option select--><div class="form-group"><label class="col-md-4 control-label" for="action_name">Label Level Correct, <span>(Placed At the top or bottom)?</span></label><div class="col-md-5"><select class="form-control"><option value="YES">YES</option><option value="NO">NO</option></select></div></div>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Remove</button></div></div><div id="field"><br>';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);

            $('.remove-me').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.charAt(this.id.length-1);
                var fieldID = "#field" + fieldNum;
                $(this).remove();
                $(fieldID).remove();
            });
    });

});
