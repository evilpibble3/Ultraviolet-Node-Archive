// Simple Frontend Service Worker Proxy
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Only intercept requests going through our custom /proxy/ path
    if (url.pathname.startsWith('/proxy/')) {
        const targetUrl = decodeURIComponent(url.pathname.replace('/proxy/', ''));
        
        // Fetches the site directly via a public cors-anywhere bridge
        const proxyRequest = new Request('https://herokuapp.com' + targetUrl, {
            method: event.request.method,
            headers: event.request.headers,
            credentials: event.request.credentials
        });
        
        event.respondWith(fetch(proxyRequest));
    }
});
