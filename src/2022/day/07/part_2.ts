import { readInputFromFile } from "../../../utils/readInputFromFile";
import { Directory, File } from "./types";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const fsRoot: Directory = { type: "dir", files: {}, name: "root" };
  const pointer: string[] = [];
  let cwd: Directory = fsRoot;

  lines.forEach(line => {
    const tokens = line.split(" ");
    // if command token '$'
    if (tokens[0] === "$") {
      // if command is cd
      if (tokens[1] === "cd") {
        // change dir
        changeDir(tokens[2])
      }
    } else {
      // if is a directory listing
      if (tokens[0] === "dir") {
        addDir(tokens[1]);
      }
      else {
        // add the file
        addFile(tokens[0], tokens[1]);

      }
    }

  })

  // add a directory object to the current directory
  function addDir(name: string): void {
    // if directory hasn't already been parsed
    if (!cwd.files[name]) {
      cwd.files[name] = { type: "dir", name, files: {} };
    }
  }

  // add a file object to the current directory
  function addFile(size: string, name: string): void {
    cwd.files[name] = { type: "file", name, size: +size };
  }

  function changeDir(token: string) {
    // if dest '/' move to root
    if (token === "/") {
      cwd = fsRoot;
    } else if (token === "..") {
      // if dest '..' move up one
      pointer.pop();
      cwd = getDirRef();
    } else {
      // else move into destination
      pointer.push(token);
      cwd = cwd.files[token] as Directory;
    }
  }

  function getDirRef() {
    // helper to get the cwd from the path pointer
    const tPtr: string[] = pointer.slice();
    // start at root
    let fs = fsRoot;
    while (tPtr.length > 0) {
      // remove first element of tPtr and traverse into it
      const next = tPtr.shift() as string;
      fs = fs.files[next] as Directory;
    }
    return fs;
  }


  // find the sizes of all directories
  function findDirs(fsRoot: Directory): any {
    const found: number[] = [];
    
    // sum up a directory and it's contents
    function sumDirs(dir: Directory): number {
      let dirSum = 0;
      const filesInDir = Object.values(dir.files);
      filesInDir.forEach((file: File | Directory) => {
        // if directory recurse and find child directory size
        if (file.type === "dir") {
          const totalSize = sumDirs(file);
          found.push(totalSize)
          dirSum += totalSize;
        } else {
          // else just add to this dirs size
          dirSum += file.size;
        }
      })
      return dirSum
    }

    // invoke with root path and push result to found array 
    // to capture value for root dir
    found.push(sumDirs(fsRoot));

    return found
  }

  // from all sizes
  const found: number[] = findDirs(fsRoot);
  // find the largest, it will be root '/', and equate to usage on disk
  const used = found.sort((a, b) => b - a)[0];
  // space required
  const required = 30000000;
  // disk capacity
  const total = 70000000;
  
  // amount needed to free up enough space
  const need = required - (total - used);
  
  // filter out folders that are too small, 
  // then find the smallest that is large enough
  return found.filter(x => x >= need).sort((a, b) => a - b)[0]
}
