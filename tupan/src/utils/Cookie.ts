import Cookies from 'js-cookie';

export const Cookie = {
  get: (key: string) => {
    return Cookies.get(key);
  },
  set: (key: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, value, options);
  },
  remove: (key: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(key, options);
  },
};