function parse(time) {
    var parts = time.split(":");
    return {
        hours: Number(parts[0]),
        miniutes: Number(parts[1])
    };
}

function getDuration(s1, s2) {
    var start = s1.stop;
    var stop = s2.start;
    var duration = stop.hours * 60 + stop.miniutes - start.hours * 60 - start.miniutes;
    return duration;
}

function compTime(t1, t2) {
    if (t1.hours < t2.hours) {
        return -1;
    } else if (t1.hours === t2.hours) {
        if (t1.miniutes < t2.miniutes) {
            return -1;
        } else if (t1.miniutes === t2.miniutes) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return 1;
    }
}

function compSched(s1, s2) {
    return compTime(s1.start, s2.start);
}

function pad(num) {
    return num <= 9 ? '0' + num : new String(num);
}

function sort(arr, comp, start, stop) {
    start = start || 0;
    stop = stop || arr.length;
    if (start === stop - 1) {
        return [].concat(arr.slice(start, stop));
    }

    var mid = Math.floor((start + stop) / 2);
    var l1 = sort(arr, comp, start, mid);
    var l2 = sort(arr, comp, mid, stop);

    var result = [];
    while (l1.length > 0 || l2.length > 0) {
        if (l1.length > 0 && l2.length > 0) {
            if (comp(l1[0], l2[0]) < 0) {
                result.push(l1.shift());
            } else {
                result.push(l2.shift());
            }
        } else if (l1.length > 0) {
            result.push(l1.shift());
        } else {
            result.push(l2.shift());
        }
    }

    return result;
}

function getStartTime(schedules, duration) {
    var allScheds = [];
    for (var i = 0; i < schedules.length; i++) {
        var scheduleList = schedules[i];
        for (var j = 0; j < scheduleList.length; j++) {
            var schedule = scheduleList[j];
            allScheds.push({
                start: parse(schedule[0]),
                stop: parse(schedule[1])
            });
        }
    }

    allScheds = sort(allScheds, compSched);

    var scheds = [];
    var sched = allScheds.shift();
    while (allScheds.length > 0) {
        var next = allScheds.shift();
        if (compTime(sched.start, next.start) <= 0 && compTime(next.start, sched.stop) <= 0) {
            sched = {
                start: sched.start,
                stop: compTime(sched.stop, next.stop) <= 0 ? next.stop : sched.stop
            }
        } else {
            scheds.push(sched);
            sched = next;
        }
    }
    scheds.push(sched);

    scheds.unshift({
        start: {
            hours: 8,
            miniutes: 59
        },
        stop: {
            hours: 9,
            miniutes: 0
        }
    });
    scheds.push({
        start: {
            hours: 19,
            miniutes: 0
        },
        stop: {
            hours: 19,
            miniutes: 1
        }
    });

    for (var i = 0; i < scheds.length - 1; i++) {
        var cur = scheds[i];
        var next = scheds[i + 1];
        if (getDuration(cur, next) >= duration) {
            return pad(cur.stop.hours) + ':' + pad(cur.stop.miniutes);
        }
    }

    return null;
}

module.exports = getStartTime;