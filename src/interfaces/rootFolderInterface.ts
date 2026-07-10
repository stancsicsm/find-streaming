export interface RootFolder {
  path: string;
  accessible: boolean;
  freeSpace: number;
  unmappedFolders: unknown[];
  id: number;
}
