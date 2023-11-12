const fs = require("node:fs");
const path = require("node:path");

const logsDirectory = path.join(__dirname, "../logs");

fs.readdir(logsDirectory, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach((file) => {
    const filePath = path.join(logsDirectory, file);

    // Limpa o conteúdo do arquivo
    fs.writeFile(filePath, "", (err) => {
      if (err) {
        console.error(`Could not clear the file: ${file}`, err);
      } else {
        console.log(`Content of ${file} has been cleared`);
      }
    });
  });
});
