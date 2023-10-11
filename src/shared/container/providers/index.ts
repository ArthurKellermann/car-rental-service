import { container } from 'tsyringe';
import { DateProvider } from './date-provider/date-provider';
import { DayjsDateProvider } from './date-provider/implementations/dayjs-date-provider';
import { MailProvider } from './mail-provider/mail-provider';
import { EtherealMailProvider } from './mail-provider/implementations/ethereal-mail-provider';
import { StorageProvider } from './storage-provider/storage-provider';
import { S3StorageProvider } from './storage-provider/implementations/s3-storage-provider';
import { LocalStorageProvider } from './storage-provider/implementations/local-storage-provider';

container.registerSingleton<DateProvider>('DateProvider', DayjsDateProvider);

container.registerInstance<MailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
);
