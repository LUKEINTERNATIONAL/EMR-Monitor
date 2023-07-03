
function display_devices_service(ip_address){
    getData(base_url+'devices/list_devices_service?ip_address='+ip_address,'viewPorts')
}
  
  function viewPorts(devices_service_data){
      $("#table_services").dataTable().fnDestroy();
      $(function() {
        $('#inactive_facilities').DataTable({
          "paging": true,
          "lengthChange": false,
          "searching": false,
          "ordering": true,
          "info": true,
          "autoWidth": false,
          "responsive": true,
        });
  
        data = devices_service_data.devices.map((value) =>{
            return [
                    value['port'],
                    value['service'],
                    value['state']
                  ]
          })
  
          var datatable = $("#table_services").dataTable().api();
          datatable.clear();
          datatable.rows.add(data);
          datatable.draw();
      });
    }
  
  
  function display_devices(data) {
   $('#count_devices').text(data.devices.length) 
   console.log(data)
  data = data.devices.map((value) =>{
        return [
          value['device_name'],
          value['device_ip'],
          value['device_status']=='active' ? `<span class=" bg-gradient-success btn-xs">${value['device_status']}</span>` :  
            `<span class=" bg-gradient-danger btn-xs">${value['device_status']}</span>`,
          value['device_mac'],
          `<button type="button" class="btn btn-primary" style="padding:0.2rem" data-toggle="modal" data-target="#modal-default"  onclick="display_devices_service('${value['device_ip']}')">View</button> `
      ]
      })
  
      var datatable = $("#devices_table").dataTable().api();
      datatable.clear();
      datatable.rows.add(data);
      datatable.draw();
       
    };
  
  
    $("#vpn_table").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        data:{}
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      $('#ll').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
  
  
   $("#devices_table").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        data:{}
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
  
  