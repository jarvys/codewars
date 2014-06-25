var assert = require("assert");
var parseMolecule = require("./index");

it('should parse water', function() {
    assert.deepEqual(parseMolecule("H2O"), {
        H: 2,
        O: 1
    });
});

it('should parse magnesium hydroxide: Mg(OH)2', function() {
    assert.deepEqual(parseMolecule("Mg(OH)2"), {
        Mg: 1,
        O: 2,
        H: 2
    });
});

it("should parse Fremy's salt: K4[ON(SO3)2]2'", function() {
    assert.deepEqual(parseMolecule("K4[ON(SO3)2]2"), {
        K: 4,
        O: 14,
        N: 2,
        S: 4
    });
});

it("should parse C6H12O6", function() {
    assert.deepEqual(parseMolecule("C6H12O6"), {
        C: 6,
        H: 12,
        O: 6
    });
});

it("should parse really weird molecule: As2{Be4C5[BCo3(CO2)3]2}4Cu5", function() {
    assert.deepEqual(parseMolecule("As2{Be4C5[BCo3(CO2)3]2}4Cu5"), {
        As: 2,
        Be: 16,
        C: 44,
        B: 8,
        Co: 24,
        O: 48,
        Cu: 5
    });
});