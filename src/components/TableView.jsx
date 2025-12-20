import React from 'react';
import * as XLSX from 'xlsx';

function TableView({ capitalInstance }) {
    const handleExportExcel = () => {
        if (!capitalInstance || !capitalInstance.data) return;

        const headers = ["Periodo", "Inversión", "Rendimientos", "Ahorro", "Saldo"];
        const rows = capitalInstance.data.map(row => [
            row.Periodo,
            row['Inversión'],
            row.Rendimientos,
            row.Ahorro,
            row.Saldo
        ]);

        const wsData = [headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Simulación CDT");

        XLSX.writeFile(wb, "simulacion_cdt.xlsx");
    };

    if (!capitalInstance || !capitalInstance.data || capitalInstance.data.length === 0) {
        return (
            <div className="empty-state">
                <p>Complete los parámetros y haga clic en "Calcular Simulación" para ver la tabla.</p>
            </div>
        );
    }

    return (
        <div className="table-view">
            <div className="table-header">
                <button onClick={handleExportExcel} className="export-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Exportar a Excel
                </button>
            </div>

            <div className="table-wrapper">
                <table>
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
                        {capitalInstance.data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Periodo}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(row['Inversión'])}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(row.Rendimientos)}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(row.Ahorro)}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(row.Saldo)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableView;
