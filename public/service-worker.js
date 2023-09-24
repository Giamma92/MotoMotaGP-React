const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/icons/*.png',
    '/logo.png'
    // Add other assets you want to cache
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Add code for handling the install prompt here
// In your service-worker.js file or main JavaScript file

self.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default browser prompt

    // You can store the event for later use (e.g., in a button click event)
    // For example, you can create a button that triggers the installation prompt
    const deferredPrompt = event;

    // Display a custom install button or UI element
    // When the user clicks this button, you can trigger the installation prompt
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
     // Add your own styling to the button
    installButton.style.backgroundColor = '#007bff';
    installButton.style.color = 'white';
    installButton.style.border = 'none';
    installButton.style.padding = '10px 20px';
    installButton.style.borderRadius = '5px';
    installButton.style.cursor = 'pointer';

    // Append the button to the document body
    document.body.appendChild(installButton);

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the installation');
            }
            deferredPrompt = null; // Reset the deferred prompt
            // Remove the install button
            installButton.style.display = 'none';
        });
    });
    

    // Display your custom UI element to inform users about the app's installability
});

