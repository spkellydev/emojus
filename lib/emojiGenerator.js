const Base62 = require("./base62");
const emojiText = require("emoji-text");

class EmojiGenerator extends Base62 {
  constructor() {
    super();
    this.data = require("../emoji.json");
    // Convenient array of emojis without encoding
    this.emojis = this.data.map(emoji => emojiText.convert(emoji.emoji));
  }

  getRandomKeys() {
    let randomEmojis = this.getRandom(this.data, 6);
    let emojiArr = this.getEmojiKeysFromDataArray(randomEmojis);
    return {
      ids: emojiArr.ids,
      persistantID: this.encodeEmojisToId(emojiArr.ids),
      emojis: emojiArr.emojis
    };
  }

  encodeEmojisToId(arr) {
    let id = this.decode(arr); // from Class Base62
    return id;
  }

  getEmojiKeysFromDataArray(arr) {
    return {
      ids: arr.map(e => e.id),
      emojis: arr.map(e => e.emoji)
    };
  }

  convertReqObjToEmojiKeys(req) {
    let pathArr = [...decodeURI(req.replace("/favicon.ico", ""))];
    pathArr = pathArr.map(e => emojiText.convert(e));
    let emojiToDecode = pathArr.map(e => {
      return this.emojis.indexOf(e);
    });

    this.emojiKeys = emojiToDecode;
    return this.emojiKeys;
  }

  // Performant function to get uniquely random array of ids from larger array
  // link to source: https://jsperf.com/k-random-elements-from-array/2
  getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
}

module.exports = EmojiGenerator;
