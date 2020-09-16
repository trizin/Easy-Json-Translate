let fs = require("fs");
const { type } = require("os");
let data = fs.readFileSync("./data/data_en.json");
data = JSON.parse(data);

getDeeper(data);

function getDeeper(obj) {
  for (var k of Object.keys(obj)) {
    if (typeof obj[k] == "object") {
      getDeeper(obj[k]);
    } else if (typeof obj[k] == "string") {
      // Found string translate here
      obj[k] = "RANDOMVALUE";
    }
  }
}
