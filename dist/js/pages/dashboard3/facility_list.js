getData(base_url+`facilities`,'slide_facilities')

function display_facilities(data,f_id = 1) {
  facility_id = f_id
  data = data.facilities.map((value) =>{
    
    if(facility_id == value['id']){
      facility_name = value['facility_name']
      dashboard_urls()
      data = [`<option value='[${value['id']},"${value['facility_name']}"]'    selected  >${value['facility_name']}</option>`, ]
      $('#facility_name').text(value['facility_name'])
    }
    else
      data = [`<option value='[${value['id']},"${value['facility_name']}"]' >${value['facility_name']}</option>`, ]
    return data
  })
  $("#facility_list").html(data)
  
};


var selectElement = document.getElementById("facility_list");
selectElement.onchange = function() { 
  facility_data = JSON.parse(this.value);
  facility_id = facility_data[0]
  facility_name = facility_data[1]
  $('#facility_name').text(facility_name)
  console.log(facility_data)
  dashboard_urls()
};


let ids = [];
let index = 0;
function slide_facilities(data){
  const filteredFacilities = data.facilities.filter(facility => facility.close_monitoring_status === "1");
  ids = filteredFacilities.map(facility => facility.id);
  printValue(data)
}

function printValue(data) {
  
    if (index < ids.length) {
      display_facilities(data, ids[index]);
      index++;
      if(sessionStorage.getItem("auto_dashboard") == '1'){
        setTimeout(() => {
          printValue(data);
        }, 60000); // Call printValue again after 20 seconds (20,000 milliseconds)
      }
    }else
    {
      window.location.href = "/index.html"
    }
}

