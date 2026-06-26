const ENV = import.meta.env as Record<string, unknown>;

const getString = (key: string) => {
  const value = ENV[key];
  if (typeof value === 'string') {
    return value;
  }

  throw new Error(`VITE_${key} is not a string`);
};

const getInt = (key: string) => {
  const value = ENV[key];
  if (typeof value === 'number') {
    return value;
  }

  throw new Error(`VITE_${key} is not a number`);
};

const config = {
  appTitle: getString('VITE_APP_TITLE'),
  appVersion: getInt('VITE_APP_VERSION'),
  apiUrl: getString('VITE_API_URL'),
};
