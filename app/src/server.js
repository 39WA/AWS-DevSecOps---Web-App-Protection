const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    application: "AWS DevSecOps Web App Protection",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.get("/login", (req, res) => {
  res.status(200).json({
    message: "Login endpoint",
    method: "POST",
    requiredFields: ["username", "password"]
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username and password are required"
    });
  }

  return res.status(401).json({
    status: "denied",
    message: "Invalid username or password"
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Web application listening on port ${PORT}`);
});