function User() {
    this.rank = -8;
    this.progress = 0;
}

User.difference = function(cur, got) {
    var d = got - cur;
    if (cur * got < 0) {
        d = d < 0 ? d + 1 : d - 1;
    }

    return d;
}

User.prototype.incRank = function(increase) {
    if (this.rank < 0 && this.rank + increase >= 0) {
        this.rank = this.rank + increase + 1;
    } else {
        this.rank = this.rank + increase;
    }

    this.rank = Math.min(this.rank, 8);
}

User.prototype.incProgress = function(rank) {
    if (rank > 8 || rank < -8 || rank === 0) {
        throw new Error("Invalid rank");
    }


    if (this.rank === 8) {
        return;
    }

    var d = User.difference(this.rank, rank);

    if (d <= -2) {
        return;
    }


    if (d === -1 || d === 0) {
        this.progress += d === -1 ? 1 : 3;
        if (this.progress >= 100) {
            this.incRank(1);
            this.progress = this.progress % 100;
        }
        return;
    }

    this.progress += d * d * 10;
    this.incRank(Math.floor(this.progress / 100));
    this.progress = this.rank === 8 ? 0 : this.progress % 100;
};

module.exports = User;