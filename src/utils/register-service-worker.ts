export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (registrations.length > 0) {
                // A service worker is already registered, you can skip registration.
                console.log('Service worker is already registered.');
            } else {
                // No active service worker found, register a new one
                navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
            }
            });
        });
    }
}