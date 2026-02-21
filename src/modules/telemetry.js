export function initTelemetry() {
    const telemetry = document.getElementById('telemetry');
    if (!telemetry) return;

    function update() {
        const now = new Date();
        const performance = window.performance.memory ?
            `${(window.performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` :
            'OPTIMIZED';

        telemetry.innerHTML = `
            SYSTEM STATUS: OPERATIONAL<br>
            CORE TEMP: STABLE<br>
            JS HEAP: ${performance}<br>
            TIMESTAMP: ${now.toLocaleTimeString()}<br>
            LOC: GUADALAJARA, MX<br>
            PROTOCOL: DRRK2-PRO-X
        `;
        setTimeout(update, 1000);
    }

    update();
}
