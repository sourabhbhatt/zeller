import {Dimensions} from 'react-native';

/* screen dimensions for responsive design */
export const {height, width} = Dimensions.get('screen');

export const formatRole = (role: string | undefined) => {
  if (!role) return 'Role Unknown';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};
