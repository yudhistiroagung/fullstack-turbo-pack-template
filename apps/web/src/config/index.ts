const ENV = import.meta.env as Record<string, unknown>;

const getString = (key: string) => {
  const value = ENV[key];
  if (typeof value === 'string') {
    return value;
  }

  throw new Error(`VITE_${key} is not a string`);
};

const getInt = (key: string) => {
  const raw = ENV[key];
  if (typeof raw !== 'string') {
    throw new Error(`VITE_${key} is not a string`);
  }

  const value = Number.parseInt(raw, 10);
  if (Number.isNaN(value)) {
    throw new Error(`VITE_${key} is not a valid integer`);
  }

  return value;
};

export const config = {
  appTitle: getString('VITE_APP_TITLE'),
  appVersion: getString('VITE_APP_VERSION'),
  apiUrl: getString('VITE_API_URL'),
  apiKey: getString('VITE_API_KEY'),
};
