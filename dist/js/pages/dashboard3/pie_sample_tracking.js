function pieChartViralLoadSampleStatus(vlData){
    if ($('#echart_pie').length) {

       let data =[{
            value: 0,
            name: 'Drawn'
        }, {
            value: 0,
            name: 'Pending'
        }, {
            value: 0,
            name: 'Test-rejected'
        }, {
            value: 0,
            name: 'Completed'
        }, {
            value: 0,
            name: 'Verified'
        }, {
            value: 0,
            name: 'Started'
        }, {
            value: 0,
            name: 'Failed'
        }, {
            value: 0,
            name: 'Not Done'
        }]

    
        console.log(data[2].value)
        vlData.viral_load.map((value) =>{
            if(value.order_status=='drawn') data[0].value++
            if(value.order_status=='pending') data[1].value++
            if(value.order_status=='test-rejected') data[2].value++
            if(value.order_status=='completed') data[3].value++
            if(value.order_status=='verified') data[4].value++
            if(value.order_status=='started') data[5].value++
            if(value.order_status=='failed') data[6].value++
            if(value.order_status=='not-done') data[7].value++
        })




        var echartPie = echarts.init(document.getElementById('echart_pie'), theme);

        echartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['Drawn', 'Pending', 'Started','Test-rejected','Failed','Voided','Not-done','Completed','Verified']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
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
            calculable: true,
            series: [{
                name: 'Sample Status',
                type: 'pie',
                radius: '55%',
                center: ['50%', '48%'],
                data: data
            }]
        });

        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };

    }
}

