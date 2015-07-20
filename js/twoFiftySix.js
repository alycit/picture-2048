function TwoFiftySix(){}

TwoFiftySix.prototype.initialize = function(direction) {
  GameView.reset().on("click", this.reset.bind(this));
  this.bindKeyEvents();
  this.bindSwipeEvents();
  this.loadGame();
  GameView.render(this.game);
  GameView.renderLegend();
}

TwoFiftySix.prototype.loadGame = function() {
  var savedBoard = localStorage.getItem('TwoFiftySixGameBoard');
  var savedScore = localStorage.getItem('TwoFiftySixGameScore');

  if(savedBoard && savedScore) {
    this.game = new Game(savedBoard, parseInt(savedScore));
  } else {
    this.game = new Game();
    this.saveGame();
  }
}

TwoFiftySix.prototype.saveGame  = function() {
  localStorage.setItem('TwoFiftySixGameBoard', this.game.toString());
  localStorage.setItem('TwoFiftySixGameScore', this.game.score);
}

TwoFiftySix.prototype.bindKeyEvents = function() {
  var that = this;
  _.each(["up", "down", "left", "right"], function(keyDirection){
    Mousetrap.bind(keyDirection, that.move.bind(that));
  });
}

TwoFiftySix.prototype.bindSwipeEvents = function() {
  var that = this;
  var board = GameView.board();
  var hammer = new Hammer.Manager(board, {preventDefault: true});
  var swipe = new Hammer.Swipe();
  hammer.add(swipe);

  _.each(["swipeup", "swipedown", "swipeleft", "swiperight"], function(swipeDirection){
    hammer.on(swipeDirection, that.move.bind(that));
  });
}

TwoFiftySix.prototype.move = function(event) {
  event.preventDefault();
  var direction = "";

  if(event.type.indexOf("swipe") != -1) {
    direction = event.type.substring(5);
  } else {
    direction = event.keyIdentifier.toLowerCase();
  }

  GameView.render(this.game.move(direction));
  this.saveGame();
}

TwoFiftySix.prototype.reset = function(event) {
  this.game = new Game();
  GameView.render(this.game);
  this.saveGame();
}
