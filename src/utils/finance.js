// Functions from finutils.py

export function teaToTem(tea) {
    let tem = Math.pow((1 + tea / 100), 1 / 12) - 1;
    return tem;
}

export function CDT_Rendimientos(inversion, tea, meses, porcentaje_retencion = 0, res = 2) {
    let tem = teaToTem(tea);
    let monto_final = inversion * Math.pow((1 + tem), meses);
    let rendimiento = monto_final - inversion;
    let retencion = rendimiento * porcentaje_retencion / 100;
    let monto_total = monto_final - retencion;
    return parseFloat(monto_total.toFixed(res));
}

// Class Capital from main.py
export class Capital {
    constructor(ahorro_inicial, ahorro_mensual, EA, plazo_años, periodo, retencion, res) {
        this.ahorro_mensual = ahorro_mensual;
        this.tiempo = plazo_años;
        this.EA = EA;
        this.TEA = teaToTem(this.EA);
        this.plazo_meses = periodo;
        this.saldo_init = ahorro_inicial;
        this.ahorro = ahorro_mensual;
        this.res = res;
        this.rendimiento = this.run_inversion(this.plazo_meses, retencion, res);
    }

    run_inversion(meses, retencion, res) {
        this.data = [];
        this.saldo = this.saldo_init;
        let EA = this.EA;
        // Adjust logic: In "plazo_años" the vanilla code seems to assume it was passed in "years * 12" (months) 
        // because it does `let plazo_años = parseFloat(...) * 12;` in `obtenerCapitalInstance`.
        // However, the class constructor receives it. The class property is called `tiempo`.
        // In `run_inversion`: `let periodos = Math.floor(this.tiempo / meses);`
        // So `this.tiempo` MUST be in total months.

        // I will assume the caller of the constructor does the conversion (years * 12) as per original code.

        let periodos = Math.floor(this.tiempo / meses);
        let periodo = 0;
        let ahorro = 0;
        for (let i = 0; i < periodos; i++) {
            periodo += 1;
            let inversion = this.saldo;
            let rendimiento_plazo = CDT_Rendimientos(inversion, EA, meses, retencion, res);
            ahorro += this.ahorro_mensual * 3;
            // WAIT: The vanilla code says `ahorro += this.ahorro_mensual * 3;`
            // and `this.saldo = rendimiento_plazo + this.ahorro_mensual * 3;`
            // This implies the simulation adds 3 months of savings every "period"?
            // Let's check the vanilla code carefully.
            // In vanilla `script.js`:
            // `run_inversion(meses, retencion, res)`
            // `periodos = Math.floor(this.tiempo / meses);`
            // `ahorro += this.ahorro_mensual * 3;` 
            // This seems hardcoded to * 3. 
            // If `meses` (periodo duration) is not 3, this might be a bug in the original or a specific feature.
            // However, the prompt says "manteniendo la logica". so I will keep it exactly as is.
            // Actually, looking at `script.js`:
            // `ahorro += this.ahorro_mensual * 3;`
            // It seems `meses` is usually passed as `periodo`. If `periodo` is 3 months (quarterly), it makes sense.
            // If `periodo` is variable, then `3` is sus.
            // BUT, I must follow "manteniendo la logica". So I will copy it exactly.

            this.saldo = rendimiento_plazo + this.ahorro_mensual * 3;
            this.data.push({
                'Periodo': periodo,
                'Inversión': inversion,
                'Rendimientos': parseFloat((rendimiento_plazo - inversion).toFixed(res)),
                'Ahorro': ahorro,
                'Saldo': this.saldo
            });
        }
    }
}
