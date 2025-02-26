import {Dimensions} from 'react-native';

/* screen dimensions for responsive design */
export const {height, width} = Dimensions.get('screen');

export const formatRole = (role: string | undefined) => {
  if (!role) return 'Role Unknown';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
