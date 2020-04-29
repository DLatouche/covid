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

    let dataCountries = await API.get("countries")
    console.log("main.js -> 21: dataCountries", dataCountries)
    let list = []
    dataCountries.data.forEach(data => {
      if (data.coordinates.latitude != 0 && data.coordinates.longitude != 0) {
        let nbDeaths = data.latest_data.deaths
        let color = ""
        if (nbDeaths <= 1) color = whiteRed
        else if (nbDeaths < 5) color = lightRed
        else if (nbDeaths < 10) color = red
        else color = darkRed
        let res = {
          title: data.name,
          latitude: data.coordinates.latitude,
          longitude: data.coordinates.longitude,
          color: color
        }
        totalConfirmed += data.latest_data.confirmed
        totalDeaths += nbDeaths
        list.push(res)
      }
    })
    $('#confirmes').text(totalConfirmed)
    $('#morts').text(totalDeaths)
    mapZone(list)


  } catch (e) {
    console.log("main.js -> 7: e", e)
  }

})()