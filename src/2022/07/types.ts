export interface FileBase {
    name: string;
}

export interface File extends FileBase {
    type: "file";
    size: number;
}

export interface Directory extends FileBase {
    type: "dir";
    files: Record<string, File | Directory>;
}