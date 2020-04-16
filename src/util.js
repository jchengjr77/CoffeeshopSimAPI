/*
 * __________ In/Out Util __________
 */
function biasedRandom(min, max, bias) {
  if (bias === -1) {
    return Math.ceil((1 - Math.cbrt(1 - Math.random())) * (max - min));
  } else if (bias === 1) {
    return Math.floor(Math.sqrt(Math.sqrt(1 - Math.random())) * (max - min));
  } else {
    return Math.floor(Math.random() * (max - min));
  }
}

function timeGroup(hour) {
  if (hour < 6 || hour > 20) {
    // Before 6 am or after 8 pm: closed
    return -2;
  } else if (hour < 9) {
    // Between 6 and 9 am: morning coffee
    return 0;
  } else if (hour < 14) {
    // Between 9 am and 2 pm: lunch rush and meetings
    return 1;
  } else if (hour < 20) {
    // After 2 pm: slow for the day
    return -1;
  }
}

exports.biasedRandom = biasedRandom;
exports.timeGroup = timeGroup;
