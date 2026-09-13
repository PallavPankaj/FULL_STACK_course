const fs = require("fs");

const folder = "uploads";

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log("uploads folder created.");
}

fs.writeFileSync(`${folder}/file1.txt`, "");
fs.writeFileSync(`${folder}/file2.txt`, "");
fs.writeFileSync(`${folder}/file3.txt`, "");

console.log("Three files created.");

console.log("\nFiles in uploads folder:");
fs.readdirSync(folder).forEach(file => console.log(file));

fs.unlinkSync(`${folder}/file3.txt`);

console.log("\nfile3.txt deleted.");
console.log("\nFiles after deletion:");
fs.readdirSync(folder).forEach(file => console.log(file));
