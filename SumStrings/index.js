function trim(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '0') {
      break;
    }

    count++;
  }

  return str.slice(count);
}

function sumStrings(a, b) {
  var a = trim(a);
  var b = trim(b);

  if (a.length < b.length) {
    return (sumStrings(b, a));
  }

  var count = a.length - b.length;
  for (var i = 0; i < count; i++) {
    b = '0' + b;
  }

  var result = '';
  var overflow = false;
  for (var i = a.length - 1; i >= 0; i--) {
    var num = Number(a[i]) + Number(b[i]);
    if (overflow) {
      num = num + 1;
    }
    overflow = num > 9;
    result = (num % 10) + result;
  }

  if (overflow) {
    result = '1' + result;
  }

  return result;
}

module.exports = sumStrings;