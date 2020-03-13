import API from "./API.js"
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
    console.log("confirmed: "+totalConfirmed);
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
          "title": data["Country/Region"],
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
    
    am4core.ready(function () {

      // Themes begin
      // Themes end

      // Create map instance
      var chart = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.polygon.fillOpacity = 0.6;


      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = darkRed;

      // Add image series
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{title}";
      imageSeries.mapImages.template.propertyFields.url = "url";

      var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle.radius = 3;
      circle.propertyFields.fill = "color";

      var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
      circle2.radius = 3;
      circle2.propertyFields.fill = "color";
      imageSeries.data = list

      circle2.events.on("inited", function (event) {
        animateBullet(event.target);
      })


      function animateBullet(circle) {
        var animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function (event) {
          animateBullet(event.target.object);
        })
      }

    });
  } catch (e) {
    console.log("main.js -> 7: e", e)
  }

})()