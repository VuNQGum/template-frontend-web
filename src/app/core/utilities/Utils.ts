import moment from "moment";
import { JuliusCalendar } from "./JuliusCalendar";

export class Utils {
    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Kiểm tra 1 ngày xem có phải là ngày nghỉ T7 hoặc CN?
     *
     * @param date
     */
    public static isDateT7OrCN(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const nth = date.getDay();
            return nth === 0 || nth === 6;
        }
    }
    /**
         * Kiểm tra 1 ngày xem có phải là ngày 10-03 âm lịch không?
         *
         * @param date
         */
    public static isNgay1003Am(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const dHV = JuliusCalendar.convertLunar2Solar(10, 3, year, 0, 7);
            if (day === dHV[0] && month === dHV[1] && year === dHV[2])
                return true;
            else return false;
        }
    }

    /**
         * Kiểm tra 1 ngày xem có phải là ngày 30-04 không?
         *
         * @param date
         */
    public static isNgay3004(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const year = date.getFullYear();
            const stDate = moment(date).format('DD/MM/YYYY');
            return stDate === `30/04/${year}`;
        }
    }

    /**
         * Kiểm tra 1 ngày xem có phải là ngày 01-05 không?
         *
         * @param date
         */
    public static isNgay0105(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const year = date.getFullYear();
            const stDate = moment(date).format('DD/MM/YYYY');
            return stDate === `01/05/${year}`;
        }
    }

    /**
         * Kiểm tra 1 ngày xem có phải là ngày 02-09 không?
         *
         * @param date
         */
    public static isNgay0209(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const year = date.getFullYear();
            const stDate = moment(date).format('DD/MM/YYYY');
            return stDate === `02/09/${year}`;
        }
    }

    /**
         * Kiểm tra 1 ngày xem có phải là ngày 01-01 dương dịch không?
         *
         * @param date
         */
    public static isNgay0101(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const year = date.getFullYear();
            const stDate = moment(date).format('DD/MM/YYYY');
            return stDate === `01/01/${year}`;
        }
    }

    /**
         * Kiểm tra 1 ngày xem có phải là ngày 01-01 âm lịch không?
         *
         * @param date
         */
    public static isNgay0101Am(date: Date): boolean {
        if (date === null) {
            return false;
        } else {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const tAM = JuliusCalendar.convertLunar2Solar(1, 1, year, 0, 7);
            if (day === tAM[0] && month === tAM[1] && year === tAM[2])
                return true;
            else return false;
        }
    }

    /**
         * Xac định số ngày nghỉ trong một khoảng thời gian
         *
         * @param date
         */
    public static holiday(start: Date, end: Date): number {
        if (start === null || end === null) {
            return 0;
        } else {
            let n = 0;
            const ms1 = start.getTime();
            const ms2 = end.getTime();
            //const year = start.getFullYear();
            const total = Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
            //const dHV = JuliusCalendar.convertLunar2Solar(10, 3, year, 0, 7);
            //const tAM = JuliusCalendar.convertLunar2Solar(1, 1, year, 0, 7);
            for (let i = 0; i <= total; i++) {
                const miDate = moment(start).add(i, 'days');
                const stDate = moment(miDate).format('DD/MM/YYYY');
                const date = new Date(stDate);
                if (this.isDateT7OrCN(date)) {
                    n = n + 1;
                    if (this.isNgay1003Am(date)) {
                        n = n + 1;
                    } else if (this.isNgay3004(date)) {
                        n = n + 1;
                    } else if (this.isNgay0105(date)) {
                        n = n + 1;
                    } else if (this.isNgay0209(date)) {
                        n = n + 1;
                    } else if (this.isNgay0101(date)) {
                        n = n + 1;
                    } else if (this.isNgay0101Am(date)) {
                        n = n + 1;
                    }
                } else {

                }
            }
            return n;
        }
    }
    
    
    public static fomatDate(date: any): Date {
        date = new Date(date)   
        const stDate = moment(date).format('YYYY-MM-DD');
        return new Date(stDate);
    }
}