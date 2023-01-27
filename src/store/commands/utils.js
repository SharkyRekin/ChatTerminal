
export const chat = async (args) => {
  return '';
};

export const whoami = async (args) => {
  return localStorage.getItem('username');
};

export const help = async (args) => {
  return `chat   : chat with your new friend bloom 🤢
 whoami : return your name (in case you forgot it) 🙈
 help : display this little output 🙃`
};
