var assert = require("assert");
var User = require("./index");

describe('User.difference', function() {
    it('should ignore zero', function() {
        assert.equal(User.difference(-3, 5), 7);
        assert.equal(User.difference(-1, 1), 1);
        assert.equal(User.difference(-1, -1), 0);
        assert.equal(User.difference(-1, -3), -2);
        assert.equal(User.difference(3, -3), -5);
    });
});


describe('User.incProgress', function() {
    it('should ignore progress lower than 1', function() {
        var user = new User();
        user.rank = 4;
        user.incProgress(2);
        assert.equal(user.rank, 4);
        assert.equal(user.progress, 0);
    });

    it('should increase rank to 1', function() {
        var user = new User();
        user.incRank(1);
        assert.equal(user.rank, -7);

        user.rank = -1;
        user.incRank(2);
        assert.equal(user.rank, 2);

        user.rank = -1;
        user.incRank(11);
        assert.equal(user.rank, 8);
    });

    it('should add progress normally', function() {
        var user = new User();
        user.rank = 4;
        user.incProgress(3);
        assert.equal(user.rank, 4);
        assert.equal(user.progress, 1);

        user.rank = 4;
        user.progress = 99;
        user.incProgress(3);
        assert.equal(user.rank, 5);
        assert.equal(user.progress, 0);

        user.rank = 4;
        user.progress = 99;
        user.incProgress(4);
        assert.equal(user.rank, 5);
        assert.equal(user.progress, 2);

        user.rank = 7;
        user.progress = 95;
        user.incProgress(8);
        assert.equal(user.rank, 8);
        assert.equal(user.progress, 0);

        user.rank = -8;
        user.progress = 0;
        user.incProgress(8);
        assert.equal(user.rank, 8);
        assert.equal(user.progress, 0);

        user.rank = 8;
        user.progress = 0;
        user.incProgress(8);
        assert.equal(user.rank, 8);
        assert.equal(user.progress, 0);
    });
});