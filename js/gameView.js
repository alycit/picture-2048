var GameView = {
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
    2: { src: "amber.jpeg", name: "Amber" },
    4: { src: "ben.jpeg", name: "Ben" },
    8: { src: "emmanuel.jpeg", name: "Emmanuel" },
    16: { src: "henry.jpeg", name: "Henry" },
    32: { src: "jack.jpeg", name: "Jack" },
    64: { src: "jason.jpeg", name: "Jason" },
    128: { src: "joe.jpeg", name: "Joe" },
    256: { src: "lola.jpeg", name: "Lola" },
    512: { src: "matt.jpeg", name: "Matt" },
    1024: { src: "michael.jpeg", name: "Michael" },
    2048: { src: "nick.jpeg", name: "Nick" },
    4096: { src: "pete.jpeg", name: "Pete" },
    8192: { src: "bo.jpeg", name: "Bo" }
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
