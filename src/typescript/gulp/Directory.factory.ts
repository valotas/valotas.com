import * as fs from 'fs';

function writeFile(name: string, data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.open(name, 'w+', (err, fd) => {
      if (err) {
        reject(err);
      }
      fs.writeFile(name, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
}

function readFile(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

class DirectoryImpl {

  constructor(private opened: Promise<string>) {

  }

  writeFile(fileName: string, data: string): Promise<string> {
    return this.opened.then((path) => {
      const name = `${path}/${fileName}`;
      return writeFile(name, data);
    });
  }

  readFile(fileName: string): Promise<string> {
    return this.opened.then((path) => {
      const name = `${path}/${fileName}`;
      return readFile(name);
    });
  }
}

export function createDirectory(dir: string): Directory {
  const openedDirectory = new Promise((resolve, reject) => {
    fs.mkdir(dir, (err) => {
      if (err && err.code !== 'EEXIST') {
        reject(err);
      } else {
        resolve(dir);
      }
    });
  });
  return new DirectoryImpl(openedDirectory);
}
