# 💰 Simulador de CDT - Calculadora de Interés Compuesto

Simulador interactivo de CDT (Certificado de Depósito a Término) con interés compuesto. Permite calcular el rendimiento de inversiones, simular ahorros mensuales y analizar la evolución del capital a lo largo del tiempo.

## 🎯 Características

- **Cálculo de Interés Compuesto**: Simula el crecimiento de tu inversión con tasas de interés efectivas anuales
- **Ahorro Mensual**: Agrega aportes mensuales y visualiza cómo impactan en tu capital final
- **Visualización Interactiva**: Gráficas dinámicas que muestran la evolución de tu inversión vs ahorros
- **Vista de Tabla Detallada**: Análisis período por período con toda la información financiera
- **Exportación a Excel**: Descarga los resultados en formato .xlsx para análisis posterior
- **Persistencia de Datos**: Los formularios mantienen sus valores para facilitar múltiples simulaciones
- **Tarjetas de Resumen**: Vista rápida del capital final, intereses ganados y retención fiscal

## 🛠️ Tecnologías

- **React 19** - Framework de UI
- **Vite** - Build tool y dev server
- **Chart.js** - Visualización de datos
- **TailwindCSS 4** - Estilos y diseño
- **XLSX** - Exportación a Excel

## 📁 Estructura del Proyecto

```
SimuladorCDT/
├── public/
│   ├── img/              # Iconos y recursos
│   ├── robots.txt        # Directivas para crawlers
│   └── sitemap.xml       # Mapa del sitio
├── src/
│   ├── components/       # Componentes React
│   │   ├── Formulario.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── ChartView.jsx
│   │   └── TableView.jsx
│   ├── utils/           # Lógica de negocio
│   │   └── finance.js   # Cálculos financieros
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
└── index.html           # HTML base con meta tags SEO
```

## 👨‍💻 Autor

**JCardenas05**

## 📄 Licencia

Este proyecto está bajo licencia MIT - ver el archivo LICENSE para más detalles.
