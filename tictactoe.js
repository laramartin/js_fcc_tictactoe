$(document).ready(function(){
  var boardArray = ["", "", "", "", "", "", "", "", ""];

  function display(array){
    for (var i = 0; i < array.length; i++ ){
      var id = "#square".concat(i+1);
      var html = array[i];
      $(id).html(html);
      console.log("id: " + id);
      console.log("html: " + html);
    }
  }

  $(".square").click(function(){
    var val = $(this).attr("id");
    var str = "#".concat(val);
    $(str).effect("pulsate", {times:1}, 40);
  });

  display(boardArray);
});
