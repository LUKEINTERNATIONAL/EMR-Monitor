getData(base_url+'districts/list/','display_districts')

  function display_districts(data,selected="") {
    sessionStorage.setItem('facilities',JSON.stringify(data));
    data = data.districts.map((value) =>{
      if(selected == value['district_id'])
        data = [`<option value='${value['district_id']}' selected  >${value['district']}</option>`, ]
      else
        data = [`<option value='${value['district_id']}' >${value['district']}</option>`, ]
      return data
    })
    data.unshift('<option></option>')
    $("#district").html(data)
    
  };