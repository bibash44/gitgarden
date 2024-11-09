const fs = require("fs");
const path = require("path");
const ContentGenerator = require("./content_generator");

class FileGenerator {
  constructor() {
    this.contentGenerator = new ContentGenerator();
    this.fileExtension = {
      code: [".js", ".java", ".py"],
      text: [".md", ".txt"],
    };

    this.tempDir = process.env.TEMP_DIR || "temp";
    this.initializeTempDirectory();
  }

  async generateFiles() {
    try {
      const minFiles = parseInt(process.env.MIN_FILES_PER_DAY || "2");
      const maxFiles = parseInt(process.env.MAX_FILES_PER_DAY || "5");

      const numberOfFiles = this._getRandomNumber(minFiles, maxFiles);
      console.log(`Generating ${numberOfFiles} files`); // Debug log

      const generatedFiles = [];
      for (let i = 0; i < numberOfFiles; i++) {
        const fileType = this._generateRandomFileType();
        const extension = this._generateExtension(fileType);
        const fileName = this._generateFileName(extension);
        const content = this.contentGenerator.generateContent(extension);

       const filePath= await this._writeFile(fileName, content);
        generatedFiles.push({ fileName, filePath });
      }

      return generatedFiles;
    } catch (error) {
      throw new Error(`File generation failed: ${error.message}`);
    }
  }

  _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  _generateRandomFileType() {
    return Math.random() > 0.5 ? "text" : "code";
  }

  _generateExtension(fileType) {
    const extensions = this.fileExtension[fileType];
    return extensions[Math.floor(Math.random() * extensions.length)];
  }
  _generateFileName(extension) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `file_${timestamp}_${randomString}${extension}`;
  }
  async _writeFile(fileName, content) {
    const filePath = path.join(process.env.TEMP_DIR || "temp", fileName);
    await fs.writeFileSync(filePath, content);
    return filePath;
  }

  initializeTempDirectory() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir);
    }
  }
}

module.exports = new FileGenerator();
