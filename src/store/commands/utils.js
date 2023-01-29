import banner_file from "./banner.json";

export const chat = async (args) => {
  return '';
};

export const whoami = async (args) => {
  return localStorage.getItem('username');
};

export const help = async (args) => {
  return `chat   : chat with your new friend bloom 🤢</br>
 whoami : return your name (in case you forgot it) 🙈</br>
 help : display this little output 🙃</br>
 banner : display a random banner 🤪`;
};

export const banner = async (args) => {
  return `
  <pre>
  ${banner_file[Math.floor(Math.random() * banner_file.length)]}
  </pre>`;
}
