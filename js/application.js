$(document).ready(function() {
  new TwoFiftySix().initialize();
});

function TwoFiftySix(){
  this.game = new Game();
}

TwoFiftySix.prototype.move = function(event) {
  GameView.render(this.game.move(event.keyIdentifier.toLowerCase()).board);
}

TwoFiftySix.prototype.initialize = function(direction) {
  var that = this;

  _.each(["up", "down", "left", "right"], function(keyDirection){
    Mousetrap.bind(keyDirection, that.move.bind(that));
  });

  GameView.render(this.game.board);
}

var GameView = {
  render: function(board){
    var $container = $("#container");
    $container.html("");

    var $table = $("<table></table>");
    $container.append($table);

    _.each(board, function(row){
      var $row = $("<tr></tr>");
      $table.append($row);

      _.each(row, function(cell){
        var $cell = cell > 0 ? $("<td>" + cell + "</td>") : $("<td></td>");
        $row.append($cell);
      });
    });
  }
}
