function distance(s1, s2, memo) {
    var memo = memo || {};
    if (memo[s1 + '-' + s2] !== undefined) {
        return memo[s1 + '-' + s2];
    }

    if (s1.length === 0 || s2.length === 0) {
        var result = Math.max(s1.length, s2.length);
        memo[s1 + '-' + s2] = result;
        return result;
    }
    
    var d1 = distance(s1, s2.slice(1), memo) + 1;
    var d2 = distance(s1.slice(1), s2, memo) + 1;
    var d3 = distance(s1.slice(1), s2.slice(1), memo);
    if (s1[0] !== s2[0]) {
        d3++;
    }

    var result = Math.min(d1, d2, d3);
    memo[s1 + '-' + s2] = result;
    return result;
}

function Dictionary(words) {
    this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
    return this.words.reduce(function(prev, cur) {
        return distance(prev, term) <= distance(cur, term) ? prev : cur;
    });
}

module.exports = Dictionary;