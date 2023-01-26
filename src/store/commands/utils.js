import { userAttributes } from '@/store/user';

export const chat = async (args) => {
  return '';
};

export const whoami = async (args) => {
  return localStorage.getItem('username');
};
