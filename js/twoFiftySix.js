function TwoFiftySix(){}

TwoFiftySix.prototype.initialize = function(direction) {
  this.bindEvents();
  this.loadGame();
  GameView.render(this.game);
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

TwoFiftySix.prototype.bindEvents = function() {
  var that = this;
  _.each(["up", "down", "left", "right"], function(keyDirection){
    Mousetrap.bind(keyDirection, that.move.bind(that));
  });
  GameView.reset().on("click", this.reset.bind(this));
}

TwoFiftySix.prototype.move = function(event) {
  GameView.render(this.game.move(event.keyIdentifier.toLowerCase()));
  this.saveGame();
}

TwoFiftySix.prototype.reset = function(event) {
  this.game = new Game();
  GameView.render(this.game);
  this.saveGame();
}
