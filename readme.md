# Easy Json Translate
### Translates every string in a json file using Google Cloud translation api.
---
## Setup
You need to setup the api key for google cloud  
Follow the instructions here https://cloud.google.com/translate/docs/setup
Do `npm install` in project directory.
## Usage
```
node translate.js target_language filename
```
Target language:  
The two letters language code that you want to translate the text to. ("en","fr","de" etc.)
Filename:
The name of the file inside the **data** folder. Do not add ".json".("data_en" etc.)

## Example Use
```
node translate.js fr data_en
```
This will translate the `data_en.json` file inside the data folder into French and will save it as `data_fr_translated.json` inside data folder.  
