const swRegister = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (err) {
            console.error('Service worker registration failed', err);
        }
        return;
    }
    console.log('Service worker not supported in this browser');
};

module.exports = swRegister;
