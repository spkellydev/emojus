module.exports = class Base62 {
  /**
   * Converts base10 ID to base62 array
   * @param {id} num serves as the id for the next record in the database
   */
  encode(num) {
    let digits = [];

    while (num > 0) {
      let remainder = Math.floor(num % 62);
      if (remainder != 0) {
        digits.push(remainder);
      }
      num = num / 62;
    }
    return digits.reverse;
  }

  /**
   * Converts array of emojis into base10 ID
   * @param {emojis} arr array of keys
   */
  decode(arr) {
    let pow = arr.length;
    let rpow = pow - 1;

    let i = 0;
    let total = 0;

    while (rpow > -1) {
      while (i < pow) {
        total += arr[i] * Math.pow(62, rpow);
        i++;
        rpow--;
      }
    }
    return total;
  }
};
