$(document).ready(function(){
  var boardArray = ["", "", "", "", "", "", "", "", ""];
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
    }
  }

  function randomNum(){
    var index = Math.floor(Math.random() * boardArray.length);
    console.log("random num: " + index);
    return index;
  }

  function startGame(){
    clearTimeout();
    boardArray = ["", "", "", "", "", "", "", "", ""];
    state = 'machine';
    machinePick();
  }

  function boardEffect(){
    $("#board").effect("pulsate", {times:1}, 1000);
  }

  function threeInLine(array) {
    // horizontal line
    for (var i = 0; i < 9;) {
      if (boardArray[i] !== "" && boardArray[i] == boardArray[i+1] && boardArray[i+1] == boardArray[i+2]){
        return true;
      }
      i+=3;
    }
    // vertical line
    for (var i = 0; i < 3;) {
      if (boardArray[i] !== "" && boardArray[i] == boardArray[i+3] && boardArray[i+3] == boardArray[i+6]){
        return true;
      }
      i++;
    }
    // diagonal line
    if (boardArray[0] !== "" && boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]){
      return true;
    } else if (boardArray[2] !== "" && boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) {
      return true;
    }
    return false;
  }

  function continuePlaying(){
      for (var i = 0; i < boardArray.length; i++) {
        if (boardArray[i] == ""){
          return true;
        }
      }
      startGame();
  }

  function winEffect(){
      boardEffect();
      setTimeout(function() { startGame(); }, 1500);
  }

  function machinePick(){
    // call randomNum to pick an index
    var index = randomNum();
    // if square is used, get another randomNum
    if (boardArray[index] !== ""){
      machinePick();
    }
    boardArray[index] = machineSymbol;
    display(boardArray);
    var isLine = threeInLine(boardArray);
    if (isLine){
      state = "initial";
      winEffect();
    }
    state = "user";
  }

  function userPick(button){
    console.log("boardArray: " + boardArray);
    // number of square clicked
    var index = parseInt(button.slice(-1));
    // if square has been picked, ignore
    if (boardArray[index] !== ""){
      return;
    }
    // buttonEffect(button);
    boardArray[index] = userSymbol;
    display(boardArray);
    var isLine = threeInLine(boardArray);
    console.log("isLine: " + isLine);
    if (isLine){
      state = "initial";
      winEffect();
    }
    if (continuePlaying()){
      state = "machine";
      machinePick();
    }
  }

  $(".square").click(function(){
    var val = $(this).attr("id");
    if (state == "user"){
      userPick(val);
    }
  });

  display(boardArray);
  startGame();
});
