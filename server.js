const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node.js + Docker + Kubernetes + Jenkins CI/CD!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app; // <-- Added for Jest testing
