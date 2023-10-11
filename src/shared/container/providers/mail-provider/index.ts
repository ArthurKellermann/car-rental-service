import { container } from 'tsyringe';
import { MailProvider } from './mail-provider';
import { EtherealMailProvider } from './implementations/ethereal-mail-provider';

container.registerSingleton<MailProvider>(
  'EtherealMailProvider',
  EtherealMailProvider,
);
