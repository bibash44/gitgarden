const logger = require("../config/logger");
const { initGit } = require("../utils/git_utils");
const FileGenerator = require("../generators/file_generator");
const fs = require("fs");
const path = require("path");

async function gitPushWithRetry(git) {
  try {
    // First try to pull
    logger.info("Pulling latest changes...");
    await git.pull("origin", "main", { "--no-rebase": null });

    // Then push
    logger.info("Pushing changes...");
    await git.push("origin", "main");
  } catch (error) {
    logger.warn("Push failed, trying force push...");
    try {
      // If pull/push fails, try force push
      await git.push("origin", "main", ["--force"]);
      logger.info("Force push successful");
    } catch (forceError) {
      logger.error("Force push also failed:", forceError);
      throw forceError;
    }
  }
}

async function generateAndPushFiles() {
  try {
    logger.info("Starting the file generation process");

    const generatedFiles = await FileGenerator.generateFiles();

    if (generatedFiles && generatedFiles.length > 0) {
      const git = await initGit();

      await git.add(".");
      await git.commit(
        `Generated ${
          generatedFiles.length
        } files on ${new Date().toISOString()}`
      );
      await gitPushWithRetry(git);
      await git.push("origin", "main");

      logger.info(
        `Successfully pushed ${generatedFiles.length} files to GitHub`
      );
      logger.info("Generated files:", generatedFiles);

      // remove files after being successfully pushed to git
      await cleanTempDirectory();
    } else {
      logger.warn("No files were generated");
    }
    return generatedFiles;
  } catch (error) {
    logger.error("Error in generate and push process:", error);
    throw error;
  }
}

async function cleanTempDirectory() {
  try {
    const tempDir = process.env.TEMP_DIR || "temp";

    // Read all files in the directory
    const files = fs.readdirSync(tempDir);

    // Delete each file
    for (const file of files) {
      fs.unlinkSync(path.join(tempDir, file));
    }

    logger.info("Temp directory cleaned successfully");
  } catch (error) {
    logger.error("Error cleaning temp directory:", error);
    throw error;
  }
}

module.exports = { generateAndPushFiles };
