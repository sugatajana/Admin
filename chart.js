Chart.defaults.font.family = 'Poppins, Arial, sans-serif';
Chart.defaults.font.size = 14;
Chart.defaults.color = '#333';
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const roomOccupancyCtx = document.getElementById('occupancyChart').getContext('2d');

var revenueChart = new Chart(revenueCtx, {
    type: 'bar',
    data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: [],
        datasets: [{
            label: 'Revenue (₹)',
            data: [],
            backgroundColor: 'rgba(127, 17, 224, 0.2)',
            borderColor: 'rgba(127, 17, 224, 1)',
            borderWidth: 1,
            fill: true,
            tension: 0.4
        },
        {
            label: 'Expenses (₹)',
            data: [],
            backgroundColor: 'rgba(225, 87, 89, 0.2)',
            borderColor: 'rgba(225, 87, 89, 1)',
            borderWidth: 1,
            fill: true,
            tension: 0.4
        },
        {
            type: 'line',
            label: 'Profit (₹)',
            data: [],
            backgroundColor: 'rgba(118, 183, 178, 0.2)',
            borderColor: 'rgba(118, 183, 178, 1)',
            borderWidth: 1,
            yAxisID: 'y',
            fill: false,
            tension: 0.4
        }
        ]
    },
    options: {
        responsive: true,
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Fiancial Overview',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            subtitle: {
                display: true,
                text: 'Revenue, Expenses, and Profit over the last 6 months',
                font: {
                    size: 14,
                    weight: 'normal'
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + formatIndianCurrency(context.raw);
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14,
                    weight: 'normal'
                },
                padding: 10,
                cornerRadius: 4
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return formatIndianCurrency(value);
                    }
                },
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Amount (₹)',
                    font: {
                        size: 16, weight: 'bold'
                    },
                }
            },
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Month',
                    font: {
                        size: 16, weight: 'bold'
                    },
                },
            }
        }
    }
});

var occupancyChart = new Chart(roomOccupancyCtx, {
    type: 'doughnut',
    data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{
            label: 'Room Occupancy',
            data: [75, 25], // Example data
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(201, 203, 207, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainaspectRatio: false,
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Room Occupancy Rate',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            subtitle: {
                display: true,
                text: 'Current occupancy status of rooms',
                font: {
                    size: 14,
                    weight: 'normal'
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return label + ': ' + value + '%';
                    }
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14,
                    weight: 'normal'
                },
                padding: 10,
                cornerRadius: 4
            }
        }
    }
});

fetchRevenueData().then(data => {
    const months = data.map(item => item.month);
    const revenues = data.map(item => item.revenue);
    const expenses = data.map(item => item.expenses);
    const profits = data.map(item => item.profit);

    revenueChart.data.labels = months;
    revenueChart.data.datasets[0].data = revenues;
    revenueChart.data.datasets[1].data = expenses;
    revenueChart.data.datasets[2].data = profits;
    revenueChart.update();
});

function formatIndianCurrency(value) {
    const absValue = Math.abs(value);
    if (absValue >= 10000000) {
        return '₹' + (value / 10000000).toFixed(1) + ' Cr';
    }
    else if (absValue >= 100000) {
        return '₹' + (value / 100000).toFixed(1) + ' L';
    }
    else if (absValue >= 1000) {
        return '₹' + (value / 1000).toFixed(1) + ' K';
    }
    else {
        return '₹' + value;
    }
}

function getLastSixMonths() {
    const months = [];
    const date = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
        months.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
    }
    return months;
}

function fetchRevenueData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = [
                { month: "April 2025", revenue: 5200, expenses: 3400, profit: 1800 },
                { month: "May 2025", revenue: 6100, expenses: 3900, profit: 2200 },
                { month: "June 2025", revenue: 4800, expenses: 3100, profit: 1700 },
                { month: "July 2025", revenue: 7000, expenses: 4200, profit: 2800 },
                { month: "August 2025", revenue: 6500, expenses: 4000, profit: 2500 },
                { month: "September 2025", revenue: 7500, expenses: 4500, profit: 3000 }
            ];
            resolve(data);
        }, 5); // simulating API delay
    });
}
