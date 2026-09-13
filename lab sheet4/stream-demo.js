const fs = require("fs");

const fileName = "large-file.txt";
let content = "";

for (let i = 1; i <= 50; i++) {
    content += `This is line number ${i}\n`;
}

fs.writeFileSync(fileName, content);

console.log("large-file.txt created with 50 lines.");
console.log("\nReading file using stream...\n");

const stream = fs.createReadStream(fileName, { encoding: "utf8" });

stream.on("data", (chunk) => {
    console.log("Chunk received. Size:", Buffer.byteLength(chunk), "bytes");
});

stream.on("end", () => {
    console.log("\nFinished reading file.");
});
