var GameView = {
  reset: function(){ return $("#reset") },
  render: function(game){
    var $container = $("#container");
    $container.html("");

    var $table = $("<table></table>");
    $container.append($table);

    _.each(game.board, function(row){
      var $row = $("<tr></tr>");
      $table.append($row);

      _.each(row, function(cell){
        var $cell = cell > 0 ? $("<td>" + cell + "</td>") : $("<td></td>");
        $row.append($cell);
      });
    });

    $("#score").html(game.score);
  }
}
