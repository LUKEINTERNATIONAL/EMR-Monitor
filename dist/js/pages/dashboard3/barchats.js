var todayDate = new Date().toISOString().slice(0, 10);
getData(base_url+`facilities/one_facility_data/9/'2023-05-19'/'${todayDate}'`,'process_encounter_data')

function random_rgba(program_name) {
  var o = Math.round, r = Math.random, s = 255;
  var R = 256, G = 256, B = 256;
  while(R+G+B > 600){
    R = o(r()*s)
    G = o(r()*s)
    B = o(r()*s)
  }
  var opacity = r().toFixed(1)
  if(program_name == "HIV PROGRAM")
    return "rgba( 47, 79, 79, 0.7)"
  if(program_name == "OPD Program")
    return "rgba(72, 61, 139, 0.7)"
  if(program_name == "ANC PROGRAM")
    return "rgba(255, 20, 147, 0.7)"
  if(program_name == "CxCa program")
    return "rgba(0, 191, 255, 0.7)"
  else
  if (opacity < 0.5) opacity += 0.5
  return 'rgba(' + R + ',' + G + ',' + B + ',' + opacity + ')';
}


function process_encounter_data(data){
  $('#_dde_status').html(data.facilities[0]['dde_enabled']=='true' ? `DDE <i class="fas fa-circle nav-icon text-success"></i>` :  
  `DDE <i class="fas fa-circle nav-icon text-danger"></i>`)

  encounter_datasets = []
  patient_datasets = []
    var total_encounters = 0;
    var total_patients = 0;
    data.facilities.forEach(x => {n = parseInt(x.total_encounters); total_encounters += isNaN(n) ? 0 : n;})
    data.facilities.forEach(x => {n = parseInt(x.total_patients); total_patients += isNaN(n) ? 0 : n;})
    console.log(total_encounters)
    $("#encounters_count").text(total_encounters);
    $("#bargraph_title").text("Encounters")
    $("#bargraph_card").text("Total Encounters")

    $("#patients_count").text(total_patients);
    $("#bargraph_title").text("Patients")
    $("#bargraph_card").text("Total Patients")


  const unique_programs = [...new Set(data.facilities.map(item => item.program_name))];
  const unique_dates = [...new Set(data.facilities.map(item => item.date))];

  
  for(const [i, program] of unique_programs.entries()){
    encounter_data = []
    patient_data = []
    for(date in unique_dates){
      var _value = data.facilities.filter((el) => el.program_name == program && el.date == unique_dates[date] )
      if(_value.length > 0){
        encounter_data.push(parseInt(_value[0].total_encounters))
        patient_data.push(parseInt(_value[0].total_patients))
        
        }
      else{
        patient_data.push(0)
        encounter_data.push(0)
      }
    }
    encounter_datasets.push(graphic(program,encounter_data))
    patient_datasets.push(graphic(program,patient_data))
  }
  // graphs(encounter_datasets,unique_dates,'#barChartEncounters');
  graphs(patient_datasets,unique_dates,'#barChart');
}

function graphic(program,data){
return {
  label               : program,
  backgroundColor     : random_rgba(program),
  borderColor         : random_rgba(program),
  pointRadius          : false,
  pointColor          : '#3b8bba',
  pointStrokeColor    : 'rgba(60,141,188,1)',
  pointHighlightFill  : '#fff',
  pointHighlightStroke: 'rgba(60,141,188,1)',
  data                : data,
}
}

function graphs(data,unique_dates,chatID) {
  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //--------------
  //- AREA CHART -
  //--------------
  
  // Get context with jQuery - using jQuery's .get() method.

  var areaChartData = {
    labels  : unique_dates,
    datasets: data
  }
//-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas = $(chatID).get(0).getContext('2d')
  var barChartData = $.extend(true, {}, areaChartData)
  var temp0 = areaChartData.datasets[0]
  var temp1 = areaChartData.datasets[1]
  barChartData.datasets[0] = temp1
  barChartData.datasets[1] = temp0

  var barChartOptions = {
    responsive              : true,
    maintainAspectRatio     : false,
    datasetFill             : false
  }

  new Chart(barChartCanvas, {
    type: 'bar',
    data: barChartData,
    options: barChartOptions
  })
}