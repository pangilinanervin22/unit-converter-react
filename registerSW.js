if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/unit-converter-react/sw.js', { scope: '/unit-converter-react/' })})}