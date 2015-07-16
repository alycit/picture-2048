var GameView = {
  board: function() { return document.getElementById("container"); },
  reset: function(){ return $("#reset") },
  render: function(game){
    var that = this;
    var $container = $("#container");
    $container.html("");

    var $table = $("<table></table>");
    $container.append($table);

    _.each(game.board, function(row){
      var $row = $("<tr></tr>");
      $table.append($row);

      _.each(row, function(cell){
        var $cell = cell > 0 ? $("<td>" + that.convertToImage(cell) + "</td>") : $("<td></td>");
        $row.append($cell);
      });
    });

    $("#score").html(game.score);
  },
  imageMap: {
    2: { src: "mike.jpeg", name: "Mike" },
    4: { src: "casey.jpeg", name: "Casey" },
    8: { src: "matt.jpeg", name: "Matt" },
    16: { src: "duke.jpeg", name: "Duke" },
    32: { src: "alyssa.jpeg", name: "Alyssa" },
    64: { src: "maurice.jpeg", name: "Maurice" },
    128: { src: "courtney.jpeg", name: "Courtney" },
    256: { src: "lia.jpeg", name: "Lia" },
    512: { src: "torey.jpeg", name: "Torey" },
    1024: { src: "lucas.jpeg", name: "Lucas" },
    2048: { src: "leon.jpeg", name: "Leon" }
  },
  convertToImage: function(cell) {
    return "<img src='images/" + this.imageMap[cell].src + "'>";
  },
  renderLegend: function() {
    var $legendContainer = $("#legend");
    var that = this;

    _.each(this.imageMap, function(value, key){
      var $legendRow = $("<div class='legendRow'></div>");
      var $text = $("<p>" + value.name + "</p>");
      var $imageDiv = $("<div class='legendItem'>" + that.convertToImage(key) + "</div>");
      $legendRow.append($imageDiv);
      $legendRow.append($text);
      $legendContainer.append($legendRow);
    });
  }
}
