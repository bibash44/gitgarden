const fs = require("fs");
const path = require("path");

class FileGenerator {
  constructor() {
    this.fileExtension = {
      code: [".js", ".java", ".cpp", ".cs", ".py"],
      text: [".md", ".txt"],
    };

    this.initializeTempDirectory()
  }

  async generateFiles() {
    try {
      const numberOfFiles = this._getRandomNumber(
        process.env.MIN_FILES_PER_DAY,
        process.env.MAX_FILES_PER_DAY
      );

      const generatedFiles = [];
      for (let i = 0; i < numberOfFiles; i++) {
        const fileType = this._generateRandomFileType();
        const extension = this._generateExtension(fileType);
        const fileName = this._generateFileName(extension);
        const content = await this._generateFileContent(fileType);

        await this._writeFile(fileName, content);
        generatedFiles.push(fileName);
      }
    } catch (error) {
      throw new Error(`File generation failed: ${error.message}`);
    }
  }

  _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  _generateRandomFileType() {
    return Math.random() > 0.5 ? "code" : "text";
  }

  _generateExtension(fileType) {
    const extensions = this.fileExtension[fileType];
    return extensions[Math.floor(Math.random() * extensions.length())];
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

  async _generateFileContent(fileType) {
    return fileType === "code"
      ? "Generate code content \\console.log('Hello world')"
      : "To do : Generate text content";
  }

  async initializeTempDirectory() {
    const tempDir = process.env.TEMP_DIR || "temp";
    if (!fs.existsSync(tempDir)) {
     await fs.mkdir(tempDir);
    }
  }
}

module.exports = new FileGenerator();
