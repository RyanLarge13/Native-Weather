import fs from "fs";
import Papa from "papaparse";

/*
  NOTE:
    If you want ot use this file to build a city to lon, lat geocoder
    download the csv from this site first and place it in assets/
    https://simplemaps.com/data/world-cities
*/
const csvFilePath = "../assets/worldcities.csv";
const jsonOutputPath = "../assets/cities.json";

const csvData = fs.readFileSync(csvFilePath, "utf8");

const parsed = Papa.parse(csvData, { header: true }).data;

const cityMap = {};

parsed.forEach((row) => {
  if (!row.city || !row.country || !row.lat || !row.lng) return;

  const key = `${row.city},${row.country}`;

  cityMap[key] = {
    lat: parseFloat(row.lat),
    lon: parseFloat(row.lng),
  };
});

fs.writeFileSync(jsonOutputPath, JSON.stringify(cityMap, null, 2));

console.log("Success!");
