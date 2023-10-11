export interface StorageProvider {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<string>;
}
