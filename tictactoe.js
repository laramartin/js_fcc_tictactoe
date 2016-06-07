$(document).ready(function(){
  var boardArray = ["", "", "", "", "", "", "", "", ""];
  var userSymbol = "";
  var machineSymbol = "";

  // "user" -> user turn
  // "machine" -> machine turn
  // "initial" -> initial state
  var state = 'initial';

  // initial popup to set symbol for user & machine
  function chooseSymbol() {
    $("#chooseSymbolDialog").dialog({
      resizable: false,
      height:140,
      modal: true,
      autoOpen: true,
      buttons: {
        "X": function() {
          userSymbol = "X";
          machineSymbol = "O";
          $( this ).dialog( "close" );
          startGame();
        },
        "O": function() {
          userSymbol = "O";
          machineSymbol = "X";
          $( this ).dialog( "close" );
          startGame();
        }
      }
    });
  }

  // display board on UI
  function display(array){
    for (var i = 0; i < array.length; i++ ){
      var id = "#square".concat(i+1);
      var html = array[i];
      $(id).html(html);
    }
  }

  // get random number for machine pick, no AI (sorry!)
  function randomNum(){
    var index = Math.floor(Math.random() * boardArray.length);
    return index;
  }

  // start a new game
  function startGame(){
    state = "machine";
    clearTimeout();
    boardArray = ["", "", "", "", "", "", "", "", ""];
    machinePick();
  }

  // check if there's a three in line
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

  // continue playing if there's empty squares
  function continuePlaying(){
      for (var i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === ""){
          return true;
        }
      }
      // tie!
      endGameEffect();
  }

  // board effect when game ends (win or lose)
  function endGameEffect(){
      $("#board").effect("pulsate", {times:1}, 1000);
      setTimeout(function() { startGame(); }, 1500);
  }

  // machine picks a random square (no AI, sorry)
  function machinePick(){
    state = 'machine';
    // call randomNum to pick an index
    var index = randomNum();
    // if square is used, get another randomNum
    if (boardArray[index] !== ""){
      return machinePick();
    }
    // add symbol to board and display it
    boardArray[index] = machineSymbol;
    display(boardArray);
    // if there's a line you win
    var isLine = threeInLine(boardArray);
    if (isLine){
      state = "initial";
      return endGameEffect();
    }
    // if no line, check if continue playing or there's a tie
    if (continuePlaying()){
      state = "user";
      userPick();
    }
  }

  // user gets to pick a square
  function userPick(button){
    if (state !== "user"){
      return;
    }
    // number of square clicked
    var index = parseInt(button.slice(-1));
    // if square has been picked, ignore
    if (boardArray[index] !== ""){
      return;
    }
    // add symbol to board and display it
    boardArray[index] = userSymbol;
    display(boardArray);
    // if there's a line you win
    var isLine = threeInLine(boardArray);
    if (isLine){
      state = "initial";
      return endGameEffect();
    }
    // if no line, check if continue playing or there's a tie
    if (continuePlaying()){
      state = "machine";
      machinePick();
    }
  }

  // get button clicked by user
  $(".square").click(function(){
    var val = $(this).attr("id");
    if (state == "user"){
      userPick(val);
    }
  });

  display(boardArray);
  chooseSymbol();

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78888129-1', 'auto');
  ga('send', 'pageview');

});
