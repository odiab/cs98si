// Create game interface
var gameUI = new GameUI(".container", player);
var opponent = player == "x" ? "o" : "x";

var displayWinner = function() {
  if (gameUI.winner == player) {
    gameUI.setMessage("Game has ended. You win!");
  } else if (gameUI.winner == opponent) {
    gameUI.setMessage("Game has ended. You lose!");
  } else {
    gameUI.setMessage("Game has ended. Tie game, you all lose!");
  }
}

// cycles around until turn is the current player, or game has ended
var waitForOpponent = function() {
  var intervalID = window.setInterval(function() {
    $.getJSON("/turn", function(turn) {
      if (turn == player) {
        // case opponents move doesn't end game
        $.getJSON("/board", function(board) {
          gameUI.setBoard(board);
        });
        gameUI.waitForMove();
        window.clearInterval(intervalID);;
      } else if (turn == "") {
        // case the opponents move ended the game
        $.getJSON("/board", function(data) {
          gameUI.setBoard(data);
          displayWinner();
        });
        window.clearInterval(intervalID);;
      }
    });
  }, 250);
};

// Initialize game
var init = function() {
  $.getJSON("/board", function(board) {
    gameUI.setBoard(board);
  });

  $.getJSON("/turn", function(turn) {
    if (turn == "") {
      gameUI.setMessage("Game has ended.")
    } else if (turn == player) {
      gameUI.setMessage("It is your turn.")
      gameUI.waitForMove();
    } else {
      gameUI.setMessage("It is player " + opponent + "'s turn.")
      waitForOpponent();
    }
  });
}

// Callback function for when the user makes a move
var callback = function(row, col, player) {
  if (!gameUI.ended) {
    var data = { row: row, col: col, player: player };
    $.getJSON("/move", data, function(response) {
      if (response) {
        gameUI.setMessage("It is player " + opponent + "'s turn.")
        waitForOpponent();
      } else {
        gameUI.setMessage("Invalid move! Try again.")
        gameUI.waitForMove();
      }
    });
  } else {
    var data = { row: row, col: col, player: player };
    $.getJSON("/move", data, function(response) {
      displayWinner();
    });
  }
};

// Set callback for user move
gameUI.callback = callback;

// Initialize game
init()
