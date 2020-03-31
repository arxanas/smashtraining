const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs").promises;

const GSP_DATA_PATH = __dirname + "/../src/gsp/EliteGspData.ts";
const END_DATA_MARKER = "// END DATA";

function parseGspNumber(text) {
  return parseInt(text.replace(" GSP", "").replace(/,/g, ""), 10);
}

async function addGspEntry(line) {
  const contents = (await fs.readFile(GSP_DATA_PATH)).toString();
  const insertLocation = contents.indexOf(END_DATA_MARKER);
  const before = contents.substr(0, insertLocation);
  const after = contents.substr(insertLocation);
  const result = before + line + ",\n  " + after;
  await fs.writeFile(GSP_DATA_PATH, result);
}

async function main() {
  try {
    const result = await axios.get("https://elitegsp.com");
    const $ = cheerio.load(result.data);
    const gspAverageNumber = parseGspNumber($("#gsp_average_number").text());
    const gspTopNumber = parseGspNumber($("#gsp_top_number").text());
    const timestamp = Date.now();
    await addGspEntry(
      `{timestamp: ${timestamp}, averageGsp: ${gspAverageNumber}, maxGsp: ${gspTopNumber}}`,
    );
  } catch (e) {
    console.log("Exception:", e);
    process.exitCode = 1;
  }
}

main();
