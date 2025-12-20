import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function ChartView({ capitalInstance }) {
    const chartData = useMemo(() => {
        if (!capitalInstance || !capitalInstance.data || capitalInstance.data.length === 0) {
            return { labels: [], datasets: [] };
        }

        const labels = capitalInstance.data.map(row => `Mes ${row['Periodo']}`);
        const saldos = capitalInstance.data.map(row => row['Saldo']);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Saldo Acumulado',
                    data: saldos,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                },
            ],
        };
    }, [capitalInstance]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                        }).format(context.parsed.y);
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: '#6B7280',
                },
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                    color: '#6B7280',
                    callback: function (value) {
                        return new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(value);
                    }
                },
                beginAtZero: true,
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    if (!capitalInstance || !capitalInstance.data || capitalInstance.data.length === 0) {
        return (
            <div className="empty-state">
                <p>Complete los parámetros y haga clic en "Calcular Simulación" para ver la gráfica.</p>
            </div>
        );
    }

    return (
        <div className="chart-wrapper">
            <Line options={options} data={chartData} />
        </div>
    );
}

export default ChartView;
