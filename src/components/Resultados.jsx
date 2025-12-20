import React, { useMemo, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Resultados({ capitalInstance, onBack }) {
    const tableRef = useRef(null);

    const { data, totalRendimientos } = useMemo(() => {
        if (!capitalInstance || !capitalInstance.data) return { data: [], totalRendimientos: 0 };

        const sum = capitalInstance.data.reduce((acc, row) => acc + row.Rendimientos, 0);
        return { data: capitalInstance.data, totalRendimientos: sum };
    }, [capitalInstance]);

    const chartData = useMemo(() => {
        if (!capitalInstance) return { labels: [], datasets: [] };

        const labels = capitalInstance.data.map(row => row['Periodo']);
        const rendimientos = capitalInstance.data.map(row => row['Rendimientos']);
        // Gradient logic is tricky in react-chartjs-2 without canvas context access in config directly.
        // We can use a simple color or try to get context. For now, mimicking the solid color/border from vanilla first.
        // Vanilla `graphs.js` used:
        // borderColor: 'rgba(255, 99, 132, 1)' and fill: false in `generateChart` (line 70-80).
        // BUT ALSO below line 141 it defines a GRADIENT.
        // "const gradient = ctx.createLinearGradient..."
        // I will stick to a solid color to be safe and simple first, or try to implement the gradient if I can access canvas.
        // Let's stick to the vanilla `generateChart` implementation (lines 63-96) logic which was `borderColor: 'rgba(255,99,132,1)'`.
        // Wait, the vanilla file had TWO `generateChart` or Chart logic blocks.
        // Lines 63-96 defines `generateChart` which is called by `generateTable`.
        // Lines 135-186 seem to be standalone or example code at the bottom? The file `graphs.js` (Step 18) executes `generateTable()` on load. 
        // `generateTable()` calls `generateChart(capitalInstance)`.
        // So the active chart logic is lines 63-96.
        // The code at the bottom (135+) `const ctx = document.getElementById('capitalChart').getContext('2d');` uses a hardcoded `periodos` and `rendimientos` variable which might not exist in that scope (they are not defined in the snippet shown). 
        // It looks like dead code or development code.
        // I will follow the logic inside `generateChart` (lines 63-96).

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Rendimientos',
                    data: rendimientos,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Adding some fill for Bar
                    borderWidth: 1,
                },
            ],
        };
    }, [capitalInstance]);

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico de Periodo vs Rendimiento',
            },
        },
    };

    const handleExportCSV = () => {
        if (!capitalInstance || !capitalInstance.data) return;

        const headers = ["Periodo", "Inversión", "Rendimientos", "Ahorro", "Saldo"];
        const rows = capitalInstance.data.map(row => [
            row.Periodo,
            row['Inversión'],
            row.Rendimientos,
            row.Ahorro,
            row.Saldo
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\r\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "tabla.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="container">
            <header className="header">
                <div>
                    <h1>Rendimiento CDT</h1>
                    <h2 id="Total">Total: ${totalRendimientos.toFixed(2)}</h2>
                </div>
                <div className="actions">
                    <button
                        className="btn regresar"
                        onClick={onBack}
                        title="Editar Parámetros"
                    >
                        Editar Parámetros
                    </button>

                    <button
                        onClick={handleExportCSV}
                        className="btn export"
                        title="Exportar CSV"
                    >
                        Exportar CSV
                    </button>
                </div>
            </header>

            <section className="table__wrapper">
                <table id="resultsTable" ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Periodo</th>
                            <th>Inversión</th>
                            <th>Rendimientos</th>
                            <th>Ahorro</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Periodo}</td>
                                <td>{row['Inversión']}</td>
                                <td>{row.Rendimientos}</td>
                                <td>{row.Ahorro}</td>
                                <td>{row.Saldo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="chart__section">
                <h3>Gráfico de Periodo vs Rendimiento</h3>
                <div className="chart__container">
                    <Bar options={options} data={chartData} />
                </div>
            </section>
        </main>
    );
}

export default Resultados;
