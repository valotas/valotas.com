import { exec } from "node:child_process";
import { readFile } from "node:fs";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const readFileAsync = promisify(readFile);

const packageJsonContent = await readFileAsync("package.json", "utf8");
const version = JSON.parse(packageJsonContent).version;

await execAsync(
  `git commit -am "Release v${version}" && git tag -a v${version} -m "Release v${version}"`
);

// eslint-disable-next-line no-undef
console.log(`Committed and tagged v${version}, to push run:
  
  git push origin master --tags`);
