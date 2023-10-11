export interface StorageProvider {
  save(file: string): Promise<string>;
  delete(file: string): Promise<void>;
}
