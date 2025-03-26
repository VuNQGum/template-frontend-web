import { Environment } from "app/core/config/app.config";
import { BaseURL } from "./baseURL";

export class CommonURL extends BaseURL {

    static login() {
        return `${this.getOrigin()}/evnid/v2/auth/login`
    }

    static refreshToken() {
        return `${this.getOrigin()}/evnid/v2/auth/refresh`
    }

    static inforMe() {
        return `${this.getOrigin()}/evnid/v2/user/me`
    }

    static logout() {
        return `${this.getOrigin()}/evnid/v2/user/logout`
    }

    static getMenu(pmCode: any) {
        return `${this.getOrigin()}/evnid/v2/admin/getMenuByUserAndPm/${pmCode}`
    }

    static getOrgParrent(orgParentId) {
        return `${this.getOrigin()}/evnid/v2/admin/getOrgParrent/${orgParentId}`
    }



}
