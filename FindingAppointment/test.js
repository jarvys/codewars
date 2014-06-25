var assert = require("assert");
var getStartTime = require("./index");

// Example from description
var schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];

it('test', function() {
    assert.equal(getStartTime(schedules, 60), '12:15');
    assert.equal(getStartTime(schedules, 90), null);
});
