if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/service_worker.js')
    .then(function() {
      console.log('Service worker registered.');
    }).catch(function() {
      console.log('Failed to register service worker.');
    });
}