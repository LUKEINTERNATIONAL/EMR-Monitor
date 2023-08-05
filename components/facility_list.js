

getData(base_url+`facilities`,'display_facilities')
  function display_facilities(data,selected="") {
    console.log(data)
    data = data.facilities.map((value) =>{
      if(selected == value['facility_id'])
        data = [`<option value='${value['id']}' selected  >${value['facility_name']}</option>`, ]
      else
        data = [`<option value='${value['id']}' >${value['facility_name']}</option>`, ]
      return data
    })
    data.unshift('<option></option>')
    $("#facility_list").html(data)
    
  };