const simpleGit = require("simple-git");
const fs = require("fs");
const logger = require("../config/logger");
const gitConfig = require("../config/git");

async function initGit() {
  try {
    const remoteURL = `https://${gitConfig.user}:${gitConfig.token}@github.com/${gitConfig.user}/${gitConfig.repo}.git`;
    const git = simpleGit();

    if (!fs.existsSync(".git")) {
      await git.init();
      logger.info("Git repository initialized");
    }

    await git.addConfig("user.name", gitConfig.user);
    await git.addConfig("user.email", gitConfig.email);

    await git.removeRemote("origin").catch(() => {});
    await git.addRemote("origin", remoteURL);

    logger.info("Git configured successfully");

    const status = await git.status();

    if (!status.current) {
      logger.info("Creating main branch...");
      await git.checkout(["-b", "main"]);

      if (!fs.existsSync("README.md")) {
        fs.writeFileSync(
          "README.md",
          "# GitGarden\nAutomatic file generator for GitHub activity."
        );
      }

      await git.add(".").commit("Initial commit");
    } else if (status.current !== "main") {
      try {
        await git.checkout("main");
      } catch (error) {
        await git.checkout(["-b", "main"]);
      }
    }

    await git.fetch();
    logger.info("Git connection tested successfully");

    return git;
  } catch (error) {
    logger.error("Git configuration failed:", error);
    throw error;
  }
}

module.exports = { initGit };