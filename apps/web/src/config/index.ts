import { getString as getStr } from '@repo/shared-utils';

const ENV = import.meta.env as Record<string, string | undefined>;
const getString = (key: string) => getStr(ENV, key);

export const config = {
  appTitle: getString('VITE_APP_TITLE'),
  appVersion: getString('VITE_APP_VERSION'),
  apiUrl: getString('VITE_API_URL'),
  apiKey: getString('VITE_API_KEY'),
};
