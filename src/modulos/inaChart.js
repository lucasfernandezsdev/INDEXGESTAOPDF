document.addEventListener('DOMContentLoaded', function () {
    var chartDom = document.getElementById('inaChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '{a|Evolução de} {b|Inadimplência} {a|(Últimos 12 meses)}',
            left: 'center',
            textStyle: {
                fontSize: 34,
                rich: {
                    a: {
                        fontSize: 34,
                        color: '#000'
                    },
                    b: {
                        fontSize: 34,
                        color: '#FFA500'
                    }
                }
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };

    option && myChart.setOption(option);
});
