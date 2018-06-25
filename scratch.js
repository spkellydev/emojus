const emojis = require("./emoji.json");

let me = emojis.filter(element => {
  if (
    element.id == 24 ||
    element.id == 62 ||
    element.id == 61 ||
    element.id == 7 ||
    element.id == 13
  ) {
    return element.emoji;
  }
});
me = me.map(s => s.emoji).join("");

console.log(me);
