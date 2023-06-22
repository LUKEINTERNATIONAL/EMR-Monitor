$("#date_range").on('data', function(){
    console.log('data')
});


$(function () {
bsCustomFileInput.init();
});




  var map = L.map("map");
  $.getJSON('/dist/malawi-detailed-boundary_966.json').then(function(geoJSON) {
  var osm = new L.TileLayer.BoundaryCanvas("/offline_map/{z}/{x}/{y}.png", {
      boundary: geoJSON,
      attribution: 'Map of Malawi'
  });
  map.addLayer(osm);
  var MalawiLayer = L.geoJSON(geoJSON);
  map.fitBounds(MalawiLayer.getBounds());
  });

   // Control 3: This add a Search bar
  var searchControl = new L.esri.Controls.Geosearch().addTo(map);

  /*var results = new L.LayerGroup().addTo(map);

      searchControl.on('results', function(data){
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
      }
      }); */

 

  // locationName = 'Karonga District Hospital';
  
var startDate = new Date().toISOString().slice(0, 10);
var endDate = new Date().toISOString().slice(0, 10);
getData(base_url+`reports/facilities_with_coordinates?start_date='${startDate}'&end_date='${endDate}'`,'display_makers')
 $(function () {
  $('#date_range').daterangepicker(
    {opens: 'right'},
      function(start, end, label) {
        startDate = start.format('YYYY-MM-DD')
        endDate = end.format('YYYY-MM-DD')
        getData(base_url+`reports/facilities_with_coordinates?start_date='${startDate}'&end_date='${endDate}'`,'display_makers')
      }
  )
})



function addMarker(data){
if(data['vpn_status']=='active'){
  var color ='green'
  var maker_image = 'marker-icon-2x-green.png'
}else{
  var color ='red'
  var maker_image = 'marker-icon-2x-red.png'
}
  if(startDate == endDate){
    makerDate = startDate
    vpn_status = data['vpn_status']
  }
  else{
    makerDate = "From "+startDate+" to "+endDate
    vpn_status = "N/A"
    var maker_image = 'marker-icon-2x-blue.png'
  }
      
    
    var greenIcon = new L.Icon({
    iconUrl: '/dist/img/marker/'+maker_image,
    shadowUrl: '/dist/img/marker/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    });
      var marker = L.marker([data['latitude'], data['longitude']], {icon: greenIcon}).addTo(map);
      marker.bindPopup(`<b>${data['facility_name']} </b><br>
      Date: (${makerDate}) <br>
      VPN Status: <b style='color:${color}'> ${vpn_status}</b><br>
      Total Patient: <b>${data['total_patients']}</b> <br> 
      Total Enconters: <b>${data['total_encounters']}</b><br>`);
}
function display_makers(data) {
  console.log(data)
  for(facility in data.facilities){
      addMarker(data.facilities[facility])
  }
}
  
function get_coordinates(obj){
//var locationName = 'Nkhata Bay District Hospital'
  if(obj.length > 0 && obj[0]['latitude'] == ""){
      const url = `https://nominatim.openstreetmap.org/search?q=${obj[0]['facility_name']}&format=json`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {  

          const lat = data[0].lat;
          const lon = data[0].lon;
          console.log(`The coordinates of ${obj[0]['facility_name']} are (${lat}, ${lon}).`);
        
          parameters = {
            'user_name':obj[0]['user_name'],
            'password':obj[0]['password'],
            'district_id':obj[0]['district_id'],
            'latitude' : lat,
            'longitude' : lon
          }
          updateData(parameters,base_url + "facilities/" + obj[0]['facility_id'])
        
        } else {
          console.error(`Could not find coordinates for ${obj[0]['facility_name']}.`);
        }
        obj.shift()
        get_coordinates(obj)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  else
  if(obj.length > 0){
    obj.shift()
    get_coordinates(obj)
    
  }
    
  
 }


function display_data(data) {
  //for(x in data.facilities){
  //  if(data.facilities[x]['latitude'] == "")
       get_coordinates(data.facilities)
 // }
  
}

getData(base_url+'facilities/list/','display_data')