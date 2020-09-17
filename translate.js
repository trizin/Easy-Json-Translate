let fs = require("fs");

const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

let data = fs.readFileSync(`./data/${process.argv[2]}.json`);
data = JSON.parse(data);
const targets = process.argv[3].includes(",")
  ? process.argv[3].split(",")
  : [process.argv[3]];

let objects = targets.map((x) => {
  return JSON.parse(JSON.stringify(data)); //Copy like a king
});

async function getDeeper(obj, target, first = false) {
  //Gets deeper...
  for (var k of Object.keys(obj)) {
    if (typeof obj[k] == "object") {
      await getDeeper(obj[k], target);
    } else if (typeof obj[k] == "string") {
      // Found string translate here
      obj[k] = await translateText(obj[k], target);
    }
  }
  if (first)
    fs.writeFileSync(
      `./data/data_${target}_translated.json`,
      JSON.stringify(obj)
    );
}
async function translateText(text, target) {
  // Translates text to target language using google cloud api
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  let translation = translations[0];
  return translation;
}

targets.forEach((x, i) => {
  getDeeper(objects[i], x, true).then(() =>
    console.log("File saved to", `./data/data_${x}_translated.json`)
  );
});
