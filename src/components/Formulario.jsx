import React, { useState } from 'react';

function Formulario({ formData, setFormData, onCalculate }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert to numbers before passing
        const data = {
            ahorro_inicial: parseFloat(formData.ahorro_inicial),
            ahorro_mensual: parseFloat(formData.ahorro_mensual),
            EA: parseFloat(formData.EA),
            plazo_años: parseFloat(formData.plazo_años) * 12, // logic from vanilla obtaining "plazo_años" as years then * 12.
            // Wait, in vanilla: `let plazo_años = parseFloat(...) * 12;`
            // So if user types "1", logic gets "12". Correct.
            periodo: parseFloat(formData.periodo),
            retencion: parseFloat(formData.retencion),
            res: parseFloat(formData.res)
        };
        onCalculate(data);
    };

    return (
        <div className="parameter-form">
            <h2>Parámetros de Inversión</h2>

            {/* Scrollable inputs container */}
            <div className="form-inputs-scroll">
                <form id="capitalForm" onSubmit={handleSubmit}>
                    <div className="formulario">
                        <label htmlFor="ahorro_inicial">Inversión Inicial ($)</label>
                        <input
                            type="number"
                            id="ahorro_inicial"
                            value={formData.ahorro_inicial}
                            onChange={handleChange}
                            required
                            placeholder="1000000"
                        />
                    </div>

                    <div className="formulario">
                        <label htmlFor="ahorro_mensual">Ahorro Mensual Adicional ($)</label>
                        <input
                            type="number"
                            id="ahorro_mensual"
                            value={formData.ahorro_mensual}
                            onChange={handleChange}
                            required
                            placeholder="100000"
                        />
                    </div>

                    <div className="formulario">
                        <label htmlFor="EA">Tasa Efectiva Anual (E.A. %)</label>
                        <input
                            type="number"
                            id="EA"
                            value={formData.EA}
                            onChange={handleChange}
                            required
                            placeholder="12"
                            step="0.01"
                        />
                    </div>

                    <div className="formulario">
                        <label htmlFor="plazo_años">Años de simulación</label>
                        <small>Para cuantos años se va a simular</small>
                        <input
                            type="number"
                            id="plazo_años"
                            value={formData.plazo_años}
                            onChange={handleChange}
                            required
                            placeholder="5"
                        />
                    </div>


                    <div className="formulario">
                        <label htmlFor="periodo">Periodo (meses):</label>
                        <small>Ciclos mensuales de capitalización</small>
                        <input
                            type="number"
                            id="periodo"
                            value={formData.periodo}
                            onChange={handleChange}
                            required
                            placeholder="3"
                        />
                    </div>

                    <div className="formulario">
                        <label htmlFor="retencion">Retención (%):</label>
                        <small>Porcentaje de impuesto o retención</small>
                        <input
                            type="number"
                            id="retencion"
                            value={formData.retencion}
                            onChange={handleChange}
                            placeholder="0"
                            step="0.01"
                        />
                    </div>

                    <div className="formulario">
                        <label htmlFor="res">Resolución:</label>
                        <small>Decimales en los resultados</small>
                        <input
                            type="number"
                            id="res"
                            value={formData.res}
                            onChange={handleChange}
                            placeholder="2"
                            min="0"
                            max="10"
                        />
                    </div>
                </form>
            </div>

            {/* Fixed submit button */}
            <button type="submit" form="capitalForm" className="calculate-btn">
                Calcular Simulación
            </button>
        </div>
    );
}

export default Formulario;
