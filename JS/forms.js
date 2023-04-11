var clickOn = function(str){
    document.getElementById(str).click();
}
function readURL(input , str) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
            document.getElementById(str).setAttribute('src', e.target.result);
            // $('#img')
            //     .attr('src', e.target.result)
        };
  
        reader.readAsDataURL(input.files[0]);
    }
}
