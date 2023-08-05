function doughnutChartViralLoadResult(data){
    var electronic_results = data.viral_load.filter((el) => el.results != "" && el.acknowledgement_type == 'test_results_delivered_to_site_electronically')
    var manual_results = data.viral_load.filter((el) => el.results != "" && el.acknowledgement_type != 'test_results_delivered_to_site_electronically')
    var without_results = data.viral_load.filter((el) => el.results == "")
    $('#viral_load').text(data.viral_load.length) 


    if ($('#echart_donut').length) {

        var echartDonut = echarts.init(document.getElementById('echart_donut'), theme);

        echartDonut.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable: true,
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Manual', 'Electron', 'No Results']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '100%',
                                width: '100%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true,
                        title: "Restore"
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            series: [{
                name: 'Access to the resource',
                type: 'pie',
                radius: ['35%', '55%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        labelLine: {
                            show: true
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'normal'
                            }
                        }
                    }
                },


                data: [{
                    value: manual_results.length,
                    name: 'Manual'
                }, {
                    value: electronic_results.length,
                    name: 'Electron'
                }, {
                    value: without_results.length,
                    name: 'No Results'
                }]
            }]
        });

    }
  }