var clickOn = function(str){
    document.getElementById(str).click();
}
var student={};

function readURL(input , str) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(str).setAttribute('src', e.target.result);
            student['pic'] = e.target.result;
            // $('#img')
            //     .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
} 



var level_change = function(sel){
    var dep = document.getElementById("department");
    if(sel.value ==='1' || sel.value==='2'){
        dep.value = "General";
        dep.disabled =  true;
    }else{
        dep.value = "";
        dep.disabled =  false;
    }
}

function max_min_val(x){
    var val = parseInt(x.value)
    if (val>4) {
        $(x).val("4")
    }
} 