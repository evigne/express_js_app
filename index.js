const express = require("express");
const path = require("path");

const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// Set Static Folder (avoid the top)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000; //check the env variable first during deployment
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
