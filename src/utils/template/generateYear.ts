import fs from "fs";
import path from "path";
import ordinal from "ordinal";

function throwError(msg: string) {
  console.error(msg);
  process.exit(1);
}

function checkYear(year: number) {
  if (Number.isNaN(year)) {
    throwError(`Year arg "${year}" is not a number!`);
  }
  if (year < 2015) {
    throwError(`Year arg "${year}" is too low, must be >= 2015!`);
  }
  if (year > 3000) {
    throwError(
      `Year arg "${year}" is too high! If this is still a thing next millenia, I'll rewrite it...`
    );
  }
}

function makeLeadingZeroDay(day: number) {
  return (day < 10 ? "0" : "") + day;
}

function copyDayFiles(
  sourceFolder: string,
  targetFolder: string,
  day: string,
  replaceToken: string
) {
  const files = fs.readdirSync(sourceFolder);
  files.forEach(function (file) {
    var source = path.join(sourceFolder, file);
    var dest = path.join(targetFolder, file);
    copyAndReplace(source, dest, replaceToken, day);
  });
}

function copyAndReplace(
  filePath: string,
  destPath: string,
  replaceToken: string,
  replaceWith: string
) {
  const data = fs.readFileSync(filePath);
  const replaced = data.toString().replaceAll(replaceToken, replaceWith);
  fs.writeFileSync(destPath.replace(replaceToken, replaceWith), replaced);
}

function main() {
  const year = +process.argv[2];
  checkYear(year);
  const replaceToken = "XX";
  const templatePath = path.join(__dirname, `day_${replaceToken}`);
  const basePath = path.join(process.cwd(), `src/${year}`);
  for (let i = 1; i <= 25; i++) {
    const dayNice = makeLeadingZeroDay(i);

    console.log(`🎁 On the ${ordinal(i)} day of Xmas... `);

    const dayFolderPath = path.join(basePath, `day`, dayNice);
    fs.mkdirSync(path.join(dayFolderPath), { recursive: true });
    copyDayFiles(templatePath, dayFolderPath, dayNice, replaceToken);
    copyAndReplace(
      path.join(__dirname, "index.ts"),
      path.join(basePath, "index.ts"),
      "YYYY",
      year.toString()
    );
  }
  console.log(" ");
  console.log("  🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄");
  console.log(`🎅                                                         🎅`);
  console.log(
    `🎄   Christmas has come, your ${year} files are ready to go!  🎄`
  );
  console.log(`🎅                                                         🎅`);
  console.log("  🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄");
}

main();
