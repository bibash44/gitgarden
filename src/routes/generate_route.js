const express = require("express");
const router = express.Router();
const { generateAndPushFiles } = require("../service/git_service");
const { initGit } = require("../utils/git_utils");

router.get("/generate", async (req, res) => {
  try {
    const files = await generateAndPushFiles();
    res.json({
      message: "Files generated and pushed successfully",
      files: files,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/test-git", async (req, res) => {
  try {
    const git = await initGit();
    const status = await git.status();
    const currentBranch = status.current || "main";

    await git
      .add(".")
      .commit("Test commit from GitGarden")
      .push("origin", currentBranch, ["--set-upstream"]);

    res.json({ message: "Git operations completed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;