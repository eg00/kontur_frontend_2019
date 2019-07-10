const fs = require('fs');
const path = require('path');

const readDir = (
    directoryPath = process.cwd(), extension = 'js', filePaths = []) => {
  directoryPath = path.normalize(directoryPath);
  const fileNames = fs.readdirSync(directoryPath);
  fileNames.map(fileName => {
    const filePath = path.join(directoryPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      readDir(filePath, extension, filePaths);
    } else if (filePath.endsWith(extension)) {
      filePaths.push(filePath);
    }
  });
  return filePaths;
};

const readFile = (filePath, encoding = 'utf8') => fs.readFileSync(filePath,
    encoding);

const getFileName = filePath => path.basename(filePath);

const getFilesAndNames = (path, encoding) => {
  const filePaths = readDir(path, 'js');
  return filePaths.map(
      path => ({
        'name': getFileName(path),
        'content': readFile(path, encoding),
      }));
};

module.exports = getFilesAndNames;

