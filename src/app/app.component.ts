import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from './shared/message.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor(private messageService: MessageService, private _swUpdate: SwUpdate) {
    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        this._swUpdate.versionUpdates
            .subscribe((response) => {
                console.log(response);
                switch (response.type) {
                    case 'VERSION_DETECTED':
                        if (confirm('Đã tìm thấy phiên bản mới. Bạn có muốn cập nhật?')) {
                            this.reload();
                        } else {
                            this.reload();
                        }
                        break;
                    case 'VERSION_READY':
                        console.log(`Current app version: ${response.currentVersion.hash}`);
                        console.log(`New app version ready for use: ${response.latestVersion.hash}`);
                        break;
                    case 'NO_NEW_VERSION_DETECTED':
                        console.log(`No new version detected`);
                        break;
                    case 'VERSION_INSTALLATION_FAILED':
                        console.log(`Failed to install app version '${response.version.hash}': ${response.error}`);
                        break;
                    default:
                        break;
                }
            });

        setInterval(() => {
            this._swUpdate.unrecoverable.subscribe();
            this._swUpdate.checkForUpdate();
        }, 60 * 1000);
    }

    reload(): void {
        this.messageService.showInfoMessage('Thông báo', 'Đã cài đặt phiên bản mới, hệ thống sẽ tải lại sau 5s');
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }
}
