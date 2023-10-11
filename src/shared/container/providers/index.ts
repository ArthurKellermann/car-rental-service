import { container } from 'tsyringe';
import { DateProvider } from './date-provider/date-provider';
import { DayjsDateProvider } from './date-provider/implementations/dayjs-date-provider';
import { MailProvider } from './mail-provider/mail-provider';
import { EtherealMailProvider } from './mail-provider/implementations/ethereal-mail-provider';
import { LocalStorageProvider } from './storage-provider/implementations/local-storage-provider';
import { StorageProvider } from './storage-provider/storage-provider';

container.registerSingleton<DateProvider>('DateProvider', DayjsDateProvider);

container.registerInstance<MailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);
