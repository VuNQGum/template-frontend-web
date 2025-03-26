import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "app/core/config/app.config";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config: Config;

    constructor(private http: HttpClient) { }

    loadConfig() {
        return this.http
            .get<Config>('../../assets/config/IPService.json')
            .toPromise()
            .then(config => {
                this.config = config;
            });
    }
}
