import API from "./API.js"
import mapZone from './mapZone.js'
(async () => {
  const darkRed = "#7f0000"
  const red = "#d32f2f"
  const lightRed = "#f44336"
  const whiteRed = "#e57373"
  try {

    let totalConfirmed = 0;
    let totalDeaths = 0;

    let jsonFileConfirmed = await API.getJson("confirmed")
    jsonFileConfirmed.forEach(data => {
      totalConfirmed += data["3/11/20"]
    })
    console.log("confirmed: " + totalConfirmed);
    $('#confirmes').text(totalConfirmed)

    let jsonFileDeaths = await API.getJson("deaths")
    let list = []
    jsonFileDeaths.forEach(data => {
      if (data["3/11/20"] >= 1) {

        let color = ""
        if (data["3/11/20"] <= 1) color = whiteRed
        else if (data["3/11/20"] < 5) color = lightRed
        else if (data["3/11/20"] < 10) color = red
        else color = darkRed
        let res = {
          "title": data["Province/State"] = undefined ? data["Country/Region"] : data["Province/State"],
          "latitude": data["Lat"],
          "longitude": data["Long"],
          "color": color
        }
        list.push(res)
      }
      totalDeaths += data["3/11/20"]
    })
    console.log("main.js -> 23: list", list)
    $('#morts').text(totalDeaths)
    mapZone(list)


  } catch (e) {
    console.log("main.js -> 7: e", e)
  }

})()