require("dotenv").config();

const cron = require("node-cron");
const simpleGit = require("simple-git");
const winston = require("winston");
const express = require("express");
const app = express();
const fs = require("fs");
const fileGenerator = require("./src/generators/file_generator");
const FileGenerator = require("./src/generators/file_generator");
const port = process.env.PORT || 3000;

const gitConfig = {
  user: process.env.GIT_USER,
  email: process.env.GIT_EMAIL,
  token: process.env.GIT_TOKEN,
  repo: process.env.GIT_REPO_URL,
};

// initialize github

async function initGit() {
  try {
    // create remote url configuration
    const remoteURL = `https://${gitConfig.user}:${gitConfig.token}@github.com/${gitConfig.user}/${gitConfig.repo}.git`;

    const git = simpleGit();

    // Check if .git exists
    if (!fs.existsSync(".git")) {
      // Initialize git repository
      await git.init();
      logger.info("Git repository initialized");
    }

    // Configure git user
    await git.addConfig("user.name", gitConfig.user);
    await git.addConfig("user.email", gitConfig.email);

    // Set up the remote
    await git.removeRemote("origin").catch(() => {}); // Remove if exists
    await git.addRemote("origin", remoteURL);

    logger.info("Git configured successfully");

    // / Create initial commit if needed
    const status = await git.status();

    if (!status.current) {
      // Create README.md if it doesn't exist
      if (!fs.existsSync("README.md")) {
        fs.writeFileSync(
          "README.md",
          "# GitGarden\nAutomatic file generator for GitHub activity."
        );
      }

      // Initial commit
      await git.add(".").commit("Initial commit");

      // Create main branch and track remote
      await git.branch(["main"]);
      await git.checkout("main");
    }

    // Test the connection
    await git.fetch();
    logger.info("Git connection tested successfully");

    return git;
  } catch (error) {
    logger.error("Git configuration failed:", error);
    throw error;
  }
}

// initialize logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// add console log if not in production
if (process.env.NODE_ENV != "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// generate random time for cron
function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24); // 0-23 hours
  const minute = Math.floor(Math.random() * 60); // 0-59 minutes
  return { hour, minute };
}

// function to handle file generation and git push

async function generateAndPushFiles() {
  try {
    logger.info("Starting the file generation process");

    const generatedFiles = await FileGenerator.generateFiles();

    if (generatedFiles && generatedFiles.length > 0) {
      const git = await initGit();

      // Add and commit files
      await git.add(`*`);
      await git.commit(
        `Generated ${
          generatedFiles.length
        } files on ${new Date().toISOString()}`
      );
      await git.push("origin", "main");

      logger.info(
        `Successfully pushed ${generatedFiles.length} files to GitHub`
      );
      logger.info("Generated files:", generatedFiles);
    } else {
      logger.warn("No files were generated");
    }
    return generatedFiles;
  } catch (error) {
    logger.error("Error in generate and push process:", error);
    // Still schedule next execution even if this one failed
    scheduleNextExecution();
    throw error;
  }
}

// Function to schedule next execution
function scheduleNextExecution() {
  const { hour, minute } = generateRandomTime();
  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule(cronExpression, async () => {
    logger.info(`Executing scheduled task at ${hour}:${minute}`);
    await generateAndPushFiles().catch((error) => {
      logger.error("Scheduled task failed:", error);
    });
  });

  logger.info(`Next execution scheduled for ${hour}:${minute}`);
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "GitGarden is running!" });
});

// Route to manually trigger generation
app.get("/generate", async (req, res) => {
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

app.get("/test-git", async (req, res) => {
  try {
    const git = await initGit();
    // Test commit and push
    // Get current branch
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

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);

  // Start the first scheduled execution
  scheduleNextExecution();
});
