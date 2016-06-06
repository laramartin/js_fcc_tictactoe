$(document).ready(function(){
  var boardArray = ["", "", "", "", "", "", "", "", ""];
  var numbers = [1,2,3,4,5,6,7,8,9];
  var userSymbol = "O";
  var machineSymbol = "X";

  // "user" -> user turn
  // "machine" -> machine turn
  // "initial" -> initial state
  var state = 'initial';

  function display(array){
    for (var i = 0; i < array.length; i++ ){
      var id = "#square".concat(i+1);
      var html = array[i];
      $(id).html(html);
      console.log("id: " + id);
      console.log("html: " + html);
    }
  }

  function usedSquare(index){
    // at position "index" delete 1 item
    var deleteIndex = numbers.splice(index, 1);
  }

  function randomNum(){
    var index = Math.floor(Math.random() * numbers.length);
    // // at position "num" delete 1 item
    // var deleteIndex = numbers.splice(index, 1);
    console.log("random num: " + index);
    console.log("numbers: " + numbers);
    return index;
  }

  function startGame(){
    numbers = [1,2,3,4,5,6,7,8,9];
    state = 'machine';
    machinePick();
  }

  function machinePick(){
    // call randomnum to pick an index
    var index = randomNum();
    console.log("index: " + index);
    // call usedSquare to delete that index
    usedSquare(index);
    console.log("boardArray" + boardArray);
    boardArray[index] = machineSymbol;
    console.log("boardArray" + boardArray);
    display(boardArray);
  }

  $(".square").click(function(){
    var val = $(this).attr("id");
    var str = "#".concat(val);
    $(str).effect("pulsate", {times:1}, 40);
  });

  display(boardArray);
  startGame();
});
