const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

// app.use(express.static(publicPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is up");
});
