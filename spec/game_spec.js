describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("should have a board", function() {
    expect(game.board).toBeDefined();
  });

  describe("generated board", function(){
    it("should have a populated board on creation", function(){
      var flatBoard = _.flatten(game.board);
      expect(flatBoard.length).toEqual(16);
    });

    it("should have 14 zeros", function(){
      var zeros = _.reject(_.flatten(game.board), function(num){ return (num == 2 || num == 4) });
      expect(zeros.length).toEqual(14);
    });

    it("should have 2 non-zero numbers", function() {
      var nonZeros = _.reject(_.flatten(game.board), function(num){ return num == 0});
      expect(nonZeros.length).toEqual(2);
    })
  });

  describe("fixed board", function(){
    beforeEach(function() {
      game = new Game('0002000000000200');
    });

    it("should have a board that represents the input string", function(){
      var zeros = _.reject(_.flatten(game.board), function(num){ return (num == 2 || num == 4) });
      expect(game.board[0][3]).toEqual(2);
      expect(game.board[3][1]).toEqual(2);
      expect(zeros.length).toEqual(14);
    });

  });

  describe("#toString", function(){

    beforeEach(function() {
      game = new Game('0002000000000200');
    });

    it("should return a string representing the board", function(){
      expect(game.toString()).toEqual('0002\n0000\n0000\n0200');
    });
  });

  describe("#combineNumbers", function(){

    it("adds an adjacent pair of numbers to the left", function(){
      expect(game.combineNumbers([2, 2, 2], 'left')).toEqual([4, 2]);
    });

    it("adds an multiple adjacent pairs of numbers to the left", function(){
      expect(game.combineNumbers([2, 2, 4, 4], 'left')).toEqual([4, 8]);
    });

    it("leaves a set with no duplicate numbers unchanged", function(){
      expect(game.combineNumbers([4, 8, 16, 32], 'left')).toEqual([4, 8, 16, 32]);
    });

    it("adds an adjacent pair of numbers to the right", function(){
      expect(game.combineNumbers([2, 2, 2], 'right')).toEqual([2, 4]);
    });
  });

  describe("#addNewNumber", function(){
    it("replaces a zero with a new 2 or 4", function(){
      var game = new Game('2200440022004400');
      game.addNewNumber();
      var zeros = _.reject(_.flatten(game.board), function(num){ return (num == 2 || num == 4) });
      var nonZeros = _.reject(_.flatten(game.board), function(num){ return num == 0});
      expect(zeros.length).toEqual(7);
      expect(nonZeros.length).toEqual(9);
    });
  });

  describe("#move", function() {

    describe("moving left", function(){

      beforeEach(function() {
        game = new Game('0002000200020002');
      });

      it("moves numbers with no duplicates to the far left", function(){
        expect(game.moveLeft().toString()).toEqual('2000\n2000\n2000\n2000');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2200440022004400');
        });

        it("combines numbers with duplicates to the far left", function(){
          expect(game.moveLeft().toString()).toEqual('4000\n8000\n4000\n8000');
        });
      });
    });

    describe("moving right", function(){

      beforeEach(function() {
        game = new Game('2000200020002000');
      });

      it("moves numbers with no duplicates to the far right", function(){
        expect(game.moveRight().toString()).toEqual('0002\n0002\n0002\n0002');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2200440022004400');
        });

        it("combines numbers with duplicates to the far right", function(){
          expect(game.moveRight().toString()).toEqual('0004\n0008\n0004\n0008');
        });
      });

    });

    describe("moving up", function(){
      beforeEach(function() {
        game = new Game('0000000000002222');
      });

      it("moves numbers with no duplicates to the far top", function(){
        expect(game.moveVertically(game.moveLeft.bind(game)).toString()).toEqual('2222\n0000\n0000\n0000');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('0000000024242424');
        });

        it("combines numbers with duplicates to the far top", function(){
          expect(game.moveVertically(game.moveLeft.bind(game)).toString()).toEqual('4848\n0000\n0000\n0000');
        });
      });
    });

    describe("moving down", function(){
      beforeEach(function() {
        game = new Game('2222000000000000');
      });

      it("moves numbers with no duplicates to the far bottom", function(){
        expect(game.moveVertically(game.moveRight.bind(game)).toString()).toEqual('0000\n0000\n0000\n2222');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2424242400000000');
        });

        it("combines numbers with duplicates to the far bottom", function(){
          expect(game.moveVertically(game.moveRight.bind(game)).toString()).toEqual('0000\n0000\n0000\n4848');
        });
      });
    });
  });
});
