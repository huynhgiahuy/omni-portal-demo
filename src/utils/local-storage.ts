export const get = (key: any) => localStorage.getItem(key);

export const set = (key: any, value: any) => localStorage.setItem(key, value);

export const remove = (key: any) => localStorage.removeItem(key);
