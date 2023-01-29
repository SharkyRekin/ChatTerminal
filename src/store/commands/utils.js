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
export const curl = async (args) => {
  fetch("https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2023/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson", {method: "GET"})
      .then(response => response.json())
      .then(data => {
      	      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
	      var dlAnchorElem = document.getElementById('downloadAnchorElem');
	      dlAnchorElem.setAttribute("href",     dataStr     );
	      dlAnchorElem.setAttribute("download", "police.json");
	      dlAnchorElem.click();
      })
};