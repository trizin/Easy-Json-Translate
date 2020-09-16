let fs = require("fs");

const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

let data = fs.readFileSync(`./data/${process.argv[3]}.json`);
data = JSON.parse(data);
const target = process.argv[2];

async function getDeeper(obj) {
  //Gets deeper...
  for (var k of Object.keys(obj)) {
    if (typeof obj[k] == "object") {
      getDeeper(obj[k]);
    } else if (typeof obj[k] == "string") {
      // Found string translate here
      obj[k] = await translateText(obj[k], target);
    }
  }
  fs.writeFileSync(
    `./data/data_${target}_translated.json`,
    JSON.stringify(data)
  );
}
async function translateText(text, target) {
  // Translates text to target language using google cloud api
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  let translation = translations[0];
  return translation;
}

getDeeper(data).then(() =>
  console.log("File saved to", `./data/data_${target}_translated.json`)
);
