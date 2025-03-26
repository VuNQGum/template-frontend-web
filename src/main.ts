import { isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));

// && !isDevMode()

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
    // if ('serviceWorker' in navigator && !isDevMode()) {
    //     navigator.serviceWorker.register('/ngsw-worker.js');
    // }
    if ('serviceWorker' in navigator) {
        // Lấy base href từ document để xác định đúng đường dẫn tới Service Worker
        const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
        navigator.serviceWorker.register(`${baseHref}ngsw-worker.js`).then(() => {
            console.log('Service Worker registered successfully for', baseHref);
        }).catch(err => {
            console.error('Service Worker registration failed:', err);
        });
    }
}).catch(err => console.log(err));
