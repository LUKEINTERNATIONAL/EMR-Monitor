function getDownTime(data){
    const time = data.facilities[0].total_time;
    const [hours, minutes] = time.match(/\d+/g);
    return hours+'.'+minutes
  }
  function getCurrentTime(){
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  function getTotalTime(){
    const startDate1 = new Date(startDate+' 00:00');
    const endDate1 = new Date(endDate+' '+getCurrentTime());
  
    // Calculate the time difference in milliseconds
    const timeDiff = endDate1 - startDate1;
  
    // Convert milliseconds to minutes
    const minutesDiff = timeDiff / (1000 * 60);
  
    // Calculate hours and minutes separately
    const hours1 = Math.floor(minutesDiff / 60);
    const minutes1 = Math.floor(minutesDiff % 60);
  
    return `${hours1}.${minutes1}`
  }
  function convertTime(time) {
    const [hours, minutes] = time.split('.').map(parseFloat);
    
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format");
    }
    
    const totalMinutes = Math.floor(hours) * 60 + Math.round(minutes);
    
    return totalMinutes;
  }
  
  function convertMinutes(minutes) {
    if (minutes < 0) {
      throw new Error("Minutes cannot be negative");
    }
    
    if (minutes >= 1440) {
      const days = Math.floor(minutes / 1440);
      const remainingMinutes = minutes % 1440;
      
      return days + " days " + convertMinutes(remainingMinutes);
    }
    
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      return hours + " H " + Math.round(remainingMinutes) + " M";
    }
    
    return minutes + " M";
  }
  
  function pieChartVPN(data){
    const downTime = getDownTime(data)
    const timeData = [downTime,`${getTotalTime()-downTime}` ];
    console.log(timeData)
    const colors = ['#f56954', '#00a65a']
    const labels = [
      'Down Time',
      'Up Time'
    ]
    
    $('#downtime').text(convertMinutes(convertTime(downTime)))
    pieDoughnutChart('pie',timeData,colors,labels)
  }
  
  var pieChart;
  function pieDoughnutChart(graph_type,data,colors,labels)
  {
  
      //-------------
    // - PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#Chart'+graph_type).get(0).getContext('2d')
    var pieData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors
        }
      ]
    }
  
    var options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var value = dataset.data[tooltipItem.index];
            return convertMinutes(convertTime(value));
          }
        }
      }
    };
  
  
    if (pieChart) {
      // If the chart instance already exists, update its data and options
      pieChart.data = pieData;
      pieChart.options = options;
      pieChart.update();
    } 
    else{
      pieChart = new Chart(pieChartCanvas, {
        type: graph_type,
        data: pieData,
        options: options
      })
    }
  }
  
  

getData(base_url+`reports/vpn_report?facility_id=1&per_day=true&start_date='${startDate}'&end_date='${endDate}'`,'VPN_table')


function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

function VPN_table(data){
  console.log(data)
  let vpn_status = data.facilities[0]['vpn_status']

  
  data = data.facilities.map((value) =>{  
    if(value['date'] == endDate){
      $('#_vpn_status').html(value['vpn_status']=='active' ? `VPN <i class="fas fa-circle nav-icon text-success"></i>` :  
      `VPN <i class="fas fa-circle nav-icon text-danger"></i>`)
    }
          
    return [
        value['date'],
        value['vpn_status']=='active' ? `<span class=" bg-gradient-success btn-xs">${value['vpn_status']}</span>` :  
          `<span class=" bg-gradient-danger btn-xs">${value['vpn_status']}</span>`,
        parseFloat(value['response_time']).toFixed(2),
        // formatBytes(value['received_bandwidth'])+'/'+formatBytes(value['transmitted_bandwidth']),
        value['total_time'].replace(/hours/g, 'H').replace(/minutes/g, 'M'),
    ]
  })

    var datatable = $("#vpn_table").dataTable().api();
    datatable.clear();
    datatable.rows.add(data);
    datatable.draw();
}

