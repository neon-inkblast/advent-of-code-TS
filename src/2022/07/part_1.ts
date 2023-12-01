import { readInputFromFile } from "../../utils/io";
import { Directory, File } from "./types";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const fsRoot: Directory = { type: "dir", files: {}, name: "root" };
  const pointer: string[] = [];
  let cwd: Directory = fsRoot;

  lines.forEach((line) => {
    const tokens = line.split(" ");
    if (tokens[0] === "$") {
      if (tokens[1] === "cd") {
        changeDir(tokens[2]);
      }
    } else {
      if (tokens[0] === "dir") {
        addDir(tokens[1]);
      } else {
        addFile(tokens[0], tokens[1]);
      }
    }
  });

  function addDir(name: string): void {
    cwd.files[name] = { type: "dir", name, files: {} };
  }
  function addFile(size: string, name: string): void {
    cwd.files[name] = { type: "file", name, size: +size };
  }

  function changeDir(token: string) {
    if (token === "/") {
      cwd = fsRoot;
    } else if (token === "..") {
      pointer.pop();
      cwd = getDirRef();
    } else {
      pointer.push(token);
      cwd = cwd.files[token] as Directory;
    }
  }

  function getDirRef() {
    const tPtr: string[] = pointer.slice();
    let fs = fsRoot;
    while (tPtr.length > 0) {
      const next = tPtr.shift() as string;
      fs = fs.files[next] as Directory;
    }
    return fs;
  }

  function findDirs(fsRoot: Directory): any {
    const found: number[] = [];

    function sumDirs(dir: Directory): number {
      let dirSum = 0;
      const filesInDir = Object.values(dir.files);
      filesInDir.forEach((file: File | Directory) => {
        // if directory recurse and find child directory size
        if (file.type === "dir") {
          const totalSize = sumDirs(file);
          found.push(totalSize);
          dirSum += totalSize;
        } else {
          // else just add to this dirs size
          dirSum += file.size;
        }
      });
      return dirSum;
    }

    // invoke with root path and push result to found array
    // to capture value for root dir
    found.push(sumDirs(fsRoot));

    return found;
  }

  const found: number[] = findDirs(fsRoot);

  const maxSize = 100000;
  // filter all directorys less than max size and then sum up collection
  return found.filter((x) => x < maxSize).reduce((a, b) => a + b);
}
