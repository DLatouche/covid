let mapZone=a=>{am4core.ready(function(){function b(a){var c=a.animate([{property:"scale",from:1,to:5},{property:"opacity",from:1,to:0}],1e3,am4core.ease.circleOut);c.events.on("animationended",function(a){b(a.target.object)})}var c=am4core.create("chartdiv",am4maps.MapChart);c.geodata=am4geodata_worldLow,c.projection=new am4maps.projections.Miller,c.chartContainer.wheelable=!1;var d=c.series.push(new am4maps.MapPolygonSeries);d.exclude=["AQ"],d.useGeodata=!0;var e=d.mapPolygons.template;e.tooltipText="{name}",e.polygon.fillOpacity=.6;var f=e.states.create("hover");f.properties.fill="#6f0000";var g=c.series.push(new am4maps.MapImageSeries);g.mapImages.template.propertyFields.longitude="longitude",g.mapImages.template.propertyFields.latitude="latitude",g.mapImages.template.tooltipText="{title}",g.mapImages.template.propertyFields.url="url";var h=g.mapImages.template.createChild(am4core.Circle);h.radius=3,h.propertyFields.fill="color";var i=g.mapImages.template.createChild(am4core.Circle);i.radius=3,i.propertyFields.fill="color",g.data=a,i.events.on("inited",function(a){b(a.target)})})};export default mapZone;