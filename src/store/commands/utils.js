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
  let URL = ""
  if (args == undefined){
    return `You need to specify a source between: </br>
	  - police 👮</br>
	  - economic 📈</br>
	  - weather ⛅</br>
	  - currency 🪙</br>
	  Usage: curl [source] </br>
	  Example: curl weather </br>`
  } else {
    switch (args) {
      case "police":
        URL = "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2023/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
        break;
      case "economic":
        URL = 'https://www.econdb.com/api/series/CPIUS/?format=json'
	break;
      case "weather":
        URL = "https://api.open-meteo.com/v1/forecast?latitude=43.60&longitude=1.44&hourly=temperature_2m"
      	break;
      case "currency":
	URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2023-01-29/currencies/eur.json"
        break;
      default:
        break;
    }
  }

  if (URL != ""){
    fetch(URL, {method: "GET"})
    .then(response => response.json())
    .then(data => {
      if (args == "weather"){
	var layout = {
	  title:'Previsionnal weather in Toulouse'
	};
	console.log(data);
	var trace = {
		  x: data.hourly.time,
		  y: data.hourly.temperature_2m,
		  mode: 'lines+markers'
	};
        Plotly.newPlot('weather', [trace], layout);
      } else {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", args+".json");
        dlAnchorElem.click();
      }
    })
  }

};
