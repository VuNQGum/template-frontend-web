import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class PushNotifications {
    constructor(private http: HttpClient) { }

    onPushAll = (title: string, notification: string) => {
        let dataAndroid = {
            app_id: "8c54e996-519d-4b86-8328-9134f37b8f55",
            headings: { en: title },
            contents: { en: notification },
            //include_external_user_ids: ["2258"]
            included_segments: ["All"],
            ios_badgeCount: 1,
            ios_badgeType: "Increase",
        };
        let dataIOS = {
            app_id: "f2e82514-6fe4-475d-9d4e-a93f1260ed40",
            headings: { en: title },
            contents: { en: notification },
            //include_external_user_ids: ["2258"]
            included_segments: ["All"],
            ios_badgeCount: 1,
            ios_badgeType: "Increase",
        };

        // Send Android
        const optionsAndroid = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization:
                    "Basic MzdjYWM2NjItYmNjZi00NjE1LTlkMzUtYmVhYTM1N2IwY2M1", //REST API KEY
            }),
        };
        this.http
            .post(
                `https://onesignal.com:443/api/v1/notifications`,
                dataAndroid,
                optionsAndroid
            )
            .subscribe((rs) => { });
        // Send iOS
        const optionsiOS = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization:
                    "Basic NTc3OWJjZGUtMmM4NC00YTQyLWFkNzAtMDg1NWNlNjY2Yjgy", //REST API KEY
            }),
        };
        this.http
            .post(
                `https://onesignal.com:443/api/v1/notifications`,
                dataIOS,
                optionsiOS
            )
            .subscribe((rs) => { });

    };

    onPush = (
        title: string,
        notification: string,
        loaithongbao: any,
        segments: string[]
    ) => {
        // if (segments != null) {
        //     segments.map((item) => {
        //         segment += item.ID_DV +''+ item.ID_NV + ',';
        //     });
        //     segment = segment.slice(0, -1);
        // }
        let dataAndroid = {
            app_id: "8c54e996-519d-4b86-8328-9134f37b8f55",
            headings: { en: title },
            contents: { en: notification },
            data: { type: loaithongbao }, // Example: {"abc": "123", "foo": "bar"}
            include_external_user_ids: segments,
            ios_badgeCount: 1,
            ios_badgeType: "Increase",
        };
        let dataIOS = {
            app_id: "f2e82514-6fe4-475d-9d4e-a93f1260ed40",
            headings: { en: title },
            contents: { en: notification },
            data: { type: loaithongbao }, // Example: {"abc": "123", "foo": "bar"}
            include_external_user_ids: segments,
            ios_badgeCount: 1,
            ios_badgeType: "Increase",
        };

        // Send Android
        const optionsAndroid = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization:
                    "Basic MzdjYWM2NjItYmNjZi00NjE1LTlkMzUtYmVhYTM1N2IwY2M1", //REST API KEY
            }),
        };
        this.http
            .post(
                `https://onesignal.com:443/api/v1/notifications`,
                dataAndroid,
                optionsAndroid
            )
            .subscribe((rs) => { });
        // Send iOS
        const optionsiOS = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Authorization:
                    "Basic NTc3OWJjZGUtMmM4NC00YTQyLWFkNzAtMDg1NWNlNjY2Yjgy", //REST API KEY
            }),
        };
        this.http
            .post(
                `https://onesignal.com:443/api/v1/notifications`,
                dataIOS,
                optionsiOS
            )
            .subscribe((rs) => {
                console.log("Đã gửi thông báo tới:", segments);
            });
    };
}

export const NotifiType = {
    DK_CT: 'DK_CT',
    DK_NP: 'DK_NP',
    HD_LD: 'HD_LD',
    KYSO_GIAYDD: 'KYSO_GIAYDD'
}