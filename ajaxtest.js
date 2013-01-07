//$("#mysubmit").click(function(){
//  var address = $('#textbox').val();
//  $.post("remotefile_test.php", function(address) {
//    if (address == '') {
//      $('#container').html('<p>Nothing!</p>');
//    }
//    else {
//      $('#container').html(data);
//    }
//  });
//});
  


$(document).ready(function() {
  function buildImageBox(filename) {
    return '<img src="' + filename + '" />';
  } 

  $("form[name=input]").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      url : form.attr('action'),
      type: form.attr('method'),
      data: form.serialize(),
      success: function(response) {
        var file_obj = $.parseJSON(response);
        if (file_obj == undefined || file_obj.filename == undefined) {
          return false;
        }
        $('#container').html(buildImageBox(file_obj.filename));
        
      }
    });
    return false;
  });
});
