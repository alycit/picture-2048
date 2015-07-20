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
      game = new Game('0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0');
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
      game = new Game('0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0');
    });

    it("should return a string representing the board", function(){
      expect(game.toString()).toEqual('0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0');
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
      var game = new Game('2,2,0,0,4,4,0,0,2,2,0,0,4,4,0,0');
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
        game = new Game('0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2');
      });

      it("moves numbers with no duplicates to the far left", function(){
        expect(game.moveLeft().toString()).toEqual('2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2,2,0,0,4,4,0,0,2,2,0,0,4,4,0,0');
        });

        it("combines numbers with duplicates to the far left", function(){
          expect(game.moveLeft().toString()).toEqual('4,0,0,0,8,0,0,0,4,0,0,0,8,0,0,0');
        });
      });
    });

    describe("moving right", function(){

      beforeEach(function() {
        game = new Game('2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0');
      });

      it("moves numbers with no duplicates to the far right", function(){
        expect(game.moveRight().toString()).toEqual('0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2,2,0,0,4,4,0,0,2,2,0,0,4,4,0,0');
        });

        it("combines numbers with duplicates to the far right", function(){
          expect(game.moveRight().toString()).toEqual('0,0,0,4,0,0,0,8,0,0,0,4,0,0,0,8');
        });
      });

    });

    describe("moving up", function(){
      beforeEach(function() {
        game = new Game('0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2');
      });

      it("moves numbers with no duplicates to the far top", function(){
        expect(game.moveVertically(game.moveLeft.bind(game)).toString()).toEqual('2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('0,0,0,0,0,0,0,0,2,4,2,4,2,4,2,4');
        });

        it("combines numbers with duplicates to the far top", function(){
          expect(game.moveVertically(game.moveLeft.bind(game)).toString()).toEqual('4,8,4,8,0,0,0,0,0,0,0,0,0,0,0,0');
        });
      });
    });

    describe("moving down", function(){
      beforeEach(function() {
        game = new Game('2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0');
      });

      it("moves numbers with no duplicates to the far bottom", function(){
        expect(game.moveVertically(game.moveRight.bind(game)).toString()).toEqual('0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2');
      });

      describe("combining numbers", function(){

        beforeEach(function() {
          game = new Game('2,4,2,4,2,4,2,4,0,0,0,0,0,0,0,0');
        });

        it("combines numbers with duplicates to the far bottom", function(){
          expect(game.moveVertically(game.moveRight.bind(game)).toString()).toEqual('0,0,0,0,0,0,0,0,0,0,0,0,4,8,4,8');
        });
      });
    });
  });
});
