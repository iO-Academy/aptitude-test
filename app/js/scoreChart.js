let ctx = document.getElementById('myChart');

Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontFamily = "'Asap', sans-serif";
let myChart = new Chart(ctx, {
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
        maintainAspectRatio: false
    }
});