const dns = require("dns");

dns.resolve("reddit.com", "NS", (err, record) => {
  if (err) {
    console.log(err);
  } else {
    console.log(record);
  }
});
