self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const response = await fetch(event.request);
    const buffer = await response.arrayBuffer();

    const newHeaders = new Headers(response.headers);

    // Main headers required for SharedArrayBuffer
    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

    // Prevent CORS issues for internal files
    newHeaders.set("Cross-Origin-Resource-Policy", "same-origin");

    return new Response(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  })());
});

