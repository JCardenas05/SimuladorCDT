import { useState } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import SummaryCards from './components/SummaryCards'
import ChartView from './components/ChartView'
import TableView from './components/TableView'
import { Capital } from './utils/finance'

function App() {
  const [formData, setFormData] = useState({
    ahorro_inicial: '',
    ahorro_mensual: '',
    EA: '',
    plazo_años: '',
    periodo: '',
    retencion: 0,
    res: 3
  });

  const [capitalInstance, setCapitalInstance] = useState(null);
  const [activeView, setActiveView] = useState('chart'); // 'chart' or 'table'

  const handleCalculate = (data) => {
    const instance = new Capital(
      data.ahorro_inicial,
      data.ahorro_mensual,
      data.EA,
      data.plazo_años,
      data.periodo,
      data.retencion,
      data.res
    );

    setCapitalInstance(instance);
  };

  return (
    <>
      <div className="app-header-container">
        <header className="app-header">
          <h1>Simulador de CDT</h1>
          <p className="subtitle">Planifica tu futuro financiero calculando el rendimiento de tus ahorros.</p>
        </header>
      </div>

      <div className="app-container">
        <div className="main-layout">
          {/* Left Sidebar - Parameters */}
          <aside className="sidebar">
            <Formulario
              formData={formData}
              setFormData={setFormData}
              onCalculate={handleCalculate}
            />
          </aside>

          {/* Main Content Area */}
          <main className="content">
            {/* Summary Cards */}
            <SummaryCards capitalInstance={capitalInstance} formData={formData} />

            {/* Visualization with Toggle Inside */}
            <div className="visualization-area">
              {/* View Toggle */}
              <div className="view-controls">
                <button
                  className={`view-btn ${activeView === 'chart' ? 'active' : ''}`}
                  onClick={() => setActiveView('chart')}
                >
                  Gráfica
                </button>
                <button
                  className={`view-btn ${activeView === 'table' ? 'active' : ''}`}
                  onClick={() => setActiveView('table')}
                >
                  Tabla
                </button>
              </div>

              {/* Chart or Table View */}
              <div className="visualization-content">
                {activeView === 'chart' ? (
                  <ChartView capitalInstance={capitalInstance} />
                ) : (
                  <TableView capitalInstance={capitalInstance} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}


export default App
