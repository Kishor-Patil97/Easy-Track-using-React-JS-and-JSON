var fs = require("fs");

export function writeToJSON(data) {
  fs.writeFile(
    "./data.json",
    JSON.stringify(data, function (err) {
      if (err) throw err;
    })
  );
}
