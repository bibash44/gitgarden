const logger = require("../config/logger");
const { initGit } = require("../utils/git_utils");
const FileGenerator = require("../generators/file_generator");

async function generateAndPushFiles() {
  try {
    logger.info("Starting the file generation process");

    const generatedFiles = await FileGenerator.generateFiles();

    if (generatedFiles && generatedFiles.length > 0) {
      const git = await initGit();

      await git.add(".");
      await git.commit(
        `Generated ${generatedFiles.length} files on ${new Date().toISOString()}`
      );
      await git.push("origin", "main");

      logger.info(`Successfully pushed ${generatedFiles.length} files to GitHub`);
      logger.info("Generated files:", generatedFiles);
    } else {
      logger.warn("No files were generated");
    }
    return generatedFiles;
  } catch (error) {
    logger.error("Error in generate and push process:", error);
    throw error;
  }
}

module.exports = { generateAndPushFiles };