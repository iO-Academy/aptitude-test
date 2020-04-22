/**
 * script for graph using chart.js, links to canvas id=myChart in adminPage.html
 */

function updateChart() {
    document.querySelector('#myChart').remove();
    document.querySelector('.chartjs-size-monitor').remove();
    document.querySelector('.show-graph').innerHTML = '<canvas id="myChart"></canvas>';
    drawChart();
}

function drawChart() {
    sendToChart().then((chartData)=>{
        let ctx = document.getElementById('myChart');
        // sets global font size and font family for the chart
        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontFamily = "'Asap', sans-serif";
        var myChart = new Chart(ctx, {
            type: 'bar',
            // data and settings populating the chart
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: "Percentage score distribution across different aptitude tests",
                    fontSize: 16,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of tests taken',
                            fontSize: 14
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips: {enabled: false},
                hover: {mode: null},
                // allows graph to be resized according to its container div size
                maintainAspectRatio: false
            }
        });
    });
}

drawChart();