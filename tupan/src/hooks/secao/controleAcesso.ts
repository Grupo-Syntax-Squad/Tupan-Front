import jsCookie from 'js-cookie';
export const useControleAcesso = () => {
  const user = jsCookie.get('user');
  if (user) {
    return true;
  }
  return false;
};
