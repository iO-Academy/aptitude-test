var ctx = document.getElementById('myChart');

Chart.defaults.global.defaultFontFamily = 'Arial';
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Test One', 'Test Two', 'Test Three'],
        datasets: [{
            label: '<70%',
            data: [8, 7, 8],
            backgroundColor: [
                '#F27324',
                '#F27324',
                '#F27324'
             ],
        },
        {
            label: '70% - 96%',
            data: [6, 5, 4],
            backgroundColor: [
                '#94BA66',
                '#94BA66',
                '#94BA66'
             ],
        },
        {
            label: '>=97%',
            data: [2, 3, 2],
            backgroundColor: [
                '#D2B4F9',
                '#D2B4F9',
                '#D2B4F9'
             ],
        }]
    },
    options: {
        legend: {
            text: "Percentage",
            display: true
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Number of tests taken'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio: false
    }
});