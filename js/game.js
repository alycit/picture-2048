function Game() {

  var that = this;
  this.board = [];

  arguments.length > 0 ? parseBoard(arguments[0].split("")) : createBoard();

  function parseBoard(board){
    boardArray = _.map(board, function(number) {
      return parseInt(number) });

    boardArray.eachSlice(4, function(row) {
      that.board.push(row);
    })
  }

  function createBoard() {
    var numbers = "0".repeat(14) + _.sample(["2", "2", "2", "4"], 2).join("");
    parseBoard(_.shuffle(numbers.split("")));
  }

}

Game.prototype.toString = function(){
  var result = [];
  for(var i = 0; i < this.board.length; i++) {
    result.push(this.board[i].join(""));
  }
  return result.join("\n");
}

Game.prototype.move = function(direction) {

  if(direction === "left") {
    this.moveLeft();
  } else if(direction === "right") {
    this.moveRight();
  } else if(direction === 'up') {
    this.moveVertically(this.moveLeft.bind(this));
  } else if(direction === 'down') {
    this.moveVertically(this.moveRight.bind(this));
  }

  this.addNewNumber();

  return this;
}

Game.prototype.addNewNumber = function() {
  var notReplaced = true;

  do {
    var row = getRandomInt(0, 4);
    var col = getRandomInt(0, 4);

    if(this.board[row][col] === 0) {
      this.board[row][col] = _.sample([2, 2, 2, 4]);
      notReplaced = false;
    }

  } while(notReplaced)

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

Game.prototype.combineNumbers = function(numbers, direction) {
  var result = [];

  if(direction === 'right') {
    numbers.reverse();
  }

  while(numbers.length > 0) {
    if(numbers[1] && (numbers[0] === numbers[1])) {
      result.push(numbers[0] + numbers[1]);
      numbers.shift();
      numbers.shift();

    } else {
      result.push(numbers[0]);
      numbers.shift();
    }
  }

  if(direction === 'right') {
    result.reverse();
  }

  return result;
}

Game.prototype.moveLeft = function() {
  var that = this;
  this.board = _.map(this.board, function(row){
    var zeroes = _.filter(row, function(num){ return num === 0});
    var numbers = that.combineNumbers(_.reject(row, function(num){ return num === 0}), 'left');
    var result = numbers.concat(zeroes);
    while(result.length < 4) {
      result.push(0);
    }
    return result;
  });

  return this;
}

Game.prototype.moveRight = function() {
  var that = this;
  this.board = _.map(this.board, function(row){
    var zeroes = _.filter(row, function(num){ return num === 0});
    var numbers = that.combineNumbers(_.reject(row, function(num){ return num === 0}), 'right');
    var result = zeroes.concat(numbers);
    while(result.length < 4) {
      result.unshift(0);
    }
    return result;
  });

  return this;
}

Game.prototype.moveVertically = function(moveFunction) {
  this.board = _.zip.apply(_, this.board);
  moveFunction();
  this.board = _.zip.apply(_, this.board);
  return this;
}