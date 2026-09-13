const http = require("http");
const url = require("url");

const students = [
    { id: 1, name: "Pallav", course: "CSE" },
    { id: 2, name: "Rahul", course: "CSE" },
    { id: 3, name: "Aman", course: "CSE" }
];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome to Node.js Server</h1>");
    }
    else if (req.method === "GET" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }
    else if (req.method === "GET" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        const student = students.find(s => s.id === id);

        if (student) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Student not found" }));
        }
    }
    else if (req.method === "GET" && req.url.startsWith("/search")) {
        const parsedUrl = url.parse(req.url, true);
        const keyword = parsedUrl.query.keyword || "";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Search Keyword: ${keyword}</h1>`);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
