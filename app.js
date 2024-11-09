require("dotenv").config();
const express = require("express");
const generateRoutes = require("./src/routes/generate_route");
const { scheduleNextExecution } = require("./src/utils/cron_utils");
const { generateAndPushFiles } = require("./src/service/git_service");

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.json({ message: "GitGarden is running!" });
});

app.use("/api", generateRoutes);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
  scheduleNextExecution(generateAndPushFiles);
});