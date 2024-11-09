const gitConfig = {
    user: process.env.GIT_USER,
    email: process.env.GIT_EMAIL,
    token: process.env.GIT_TOKEN,
    repo: process.env.GIT_REPO_URL,
  };
  
  module.exports = gitConfig;