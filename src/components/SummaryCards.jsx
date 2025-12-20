import React, { useMemo } from 'react';

function SummaryCards({ capitalInstance, formData }) {
    const { totalInvertido, interesesGanados, saldoFinal } = useMemo(() => {
        if (!capitalInstance || !capitalInstance.data || capitalInstance.data.length === 0) {
            return {
                totalInvertido: 0,
                interesesGanados: 0,
                saldoFinal: 0
            };
        }

        const lastRow = capitalInstance.data[capitalInstance.data.length - 1];
        const initialAmount = parseFloat(formData.ahorro_inicial) || 0;
        const totalSavings = lastRow.Ahorro || 0;
        const totalInvertido = initialAmount + totalSavings;
        const saldoFinal = lastRow.Saldo || 0;
        const interesesGanados = saldoFinal - totalInvertido;

        return {
            totalInvertido,
            interesesGanados,
            saldoFinal
        };
    }, [capitalInstance, formData]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="summary-cards">
            <div className="summary-card card-blue">
                <div className="card-label">TOTAL INVERTIDO</div>
                <div className="card-value">{formatCurrency(totalInvertido)}</div>
            </div>

            <div className="summary-card card-green">
                <div className="card-label">INTERESES GANADOS</div>
                <div className="card-value">{formatCurrency(interesesGanados)}</div>
            </div>

            <div className="summary-card card-orange">
                <div className="card-label">SALDO FINAL</div>
                <div className="card-value">{formatCurrency(saldoFinal)}</div>
            </div>
        </div>
    );
}

export default SummaryCards;
