require("dotenv").config();
const path = require("path");
const express = require("express");
const port = process.env.PORT || 4000;
const tollRoutes = require("../routes/tollRoutes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(
      path.resolve(__dirname, "../..", "frontend", "build", "index.html")
    );
  });
}

app.use("/api/tolls", tollRoutes);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
