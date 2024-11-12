import jsCookie from 'js-cookie';
export const useControleAcesso = () => {
  const token = jsCookie.get('user');
  if (token) {
    return true;
  }
  return false;
};
