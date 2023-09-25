import { container } from 'tsyringe';
import { DateProvider } from './date-provider/date-provider';
import { DayjsDateProvider } from './date-provider/implementations/dayjs-date-provider';

container.registerSingleton<DateProvider>('DateProvider', DayjsDateProvider);
