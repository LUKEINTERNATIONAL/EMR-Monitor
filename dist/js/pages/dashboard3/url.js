function dashboard_urls(){
    getData(base_url+`devices/list?facility_id=${facility_id}`,'display_devices')
    getData(base_url+`users/his_officer?facility_id=${facility_id}`,'display_his_officer')
    getData(base_url+`facilities/one_facility_data/${facility_id}/'${startDate}'/'${endDate}'`,'process_encounter_data')
    getData(base_url+`reports/viral_load_report?facility_id=${facility_id}&start_date='${startDate}'&end_date='${endDate}'`,'viral_load_data')
    getData(base_url+`reports/vpn_report?facility_id=${facility_id}&start_date='${startDate}'&end_date='${endDate}'`,'pieChartVPN')
    getData(base_url+'databases/list_facility_dumps/'+facility_name.replace(/ /g, "_"),'display_facility_dumps')
    getData(base_url+`reports/vpn_report?facility_id=${facility_id}&per_day=true&start_date='${startDate}'&end_date='${endDate}'`,'VPN_table')

}

function viral_load_data(data){
    doughnutChartViralLoadResult(data)
    pieChartViralLoadSampleStatus(data)
}
