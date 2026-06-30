export const getString = (env: Record<string, string | undefined>, key: string): string => {
  const value = env[key];
  if (typeof value === 'string') {
    return value;
  }

  throw new Error(`${key} is not a string`);
};

export const getInt = (env: Record<string, string | undefined>, key: string): number => {
  const raw = env[key];
  if (typeof raw !== 'string') {
    throw new Error(`${key} is not a string`);
  }

  const value = Number.parseInt(raw, 10);
  if (Number.isNaN(value)) {
    throw new Error(`${key} is not a valid integer`);
  }

  return value;
};
