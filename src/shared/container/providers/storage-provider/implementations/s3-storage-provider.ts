import { StorageProvider } from '../storage-provider';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { resolve } from 'path';
import upload from '../../../../../config/upload';
import fs from 'fs';
import mime from 'mime';

export class S3StorageProvider implements StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    const putObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: file,
      Body: fileContent,
      ContentType,
    };

    await this.client.send(new PutObjectCommand(putObjectParams));

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string): Promise<void> {
    const deleteObjectParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: file,
    };

    await this.client.send(new DeleteObjectCommand(deleteObjectParams));
  }
}
