const fs = require("fs");

const oldFile = "student.txt";
const newFile = "profile.txt";

fs.writeFile(oldFile, "Name: Pallav Pankaj\nRoll Number: 101", (err) => {
    if (err) throw err;
    console.log("student.txt created and data written.");

    fs.appendFile(oldFile, "\nCourse: Full Stack Web Development", (err) => {
        if (err) throw err;
        console.log("Course appended.");

        fs.readFile(oldFile, "utf8", (err, data) => {
            if (err) throw err;
            console.log("\nFile Content:");
            console.log(data);

            fs.rename(oldFile, newFile, (err) => {
                if (err) throw err;
                console.log("\nFile renamed from student.txt to profile.txt.");
            });
        });
    });
});
