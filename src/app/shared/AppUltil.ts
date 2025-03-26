import { CommonApiService } from "app/services/commonHttp";
import { TreeNode } from "primeng/api";
import { Subject, takeUntil } from "rxjs";

export const MessageKey = {
    FN_HEADER_NAME: 'FN_HEADER_NAME',
};
export class AppUltil {
    static can_view: boolean;
    /**
     * Constructor
     */
    constructor() {
    }

    public static base64ToBlob(base64) {
        try {
            const binaryString = window.atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; ++i) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return new Blob([bytes], { type: 'application/octet-stream' });
        }
        catch { return undefined; }
    };

    public static blobToBase64(blob: Blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    public static convertDataURIToBinary(dataURI: string) {
        var raw = window.atob(dataURI);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    public static checkImageFile(fileExtend: any) {
        if (
            fileExtend.toLowerCase().includes('jpg') ||
            fileExtend.toLowerCase().includes('jpeg') ||
            fileExtend.toLowerCase().includes('png') ||
            fileExtend.toLowerCase().includes('gif')
        )
            return true;
        else return false;
    }

    public static isValidDate(dateString: string): boolean {
        // Regex to check the format DD-MM-YYYY
        const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

        // Check if the string matches the regex
        if (!regex.test(dateString)) {
            return false;
        }

        // Split the date string into its components
        const parts = dateString.split('-');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
        const year = parseInt(parts[2], 10);

        // Create a Date object
        const date = new Date(year, month, day);

        // Check if the created date matches the input date
        return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    }


    public static removeAccents(strRe) {
        // Xóa dấu tiếng việt
        let str = strRe ? strRe : ""
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    // Recursive function to find a node by its ID
    public static findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
        if (!nodes || !id) {
            return null;
        }

        for (let node of nodes) {
            if (node.key === id) {
                return node; // Node found
            }

            if (node.children) {
                const foundNode = this.findNodeById(node.children, id);
                if (foundNode) {
                    return foundNode; // Return the found node from children
                }
            }
        }

        return null; // Node not found
    }

    public static convertStringToDate(dateString) {
        const [day, month, year] = dateString.split('/');
        const fullYear = year.length === 2 ? '20' + year : year; // Bổ sung thế kỷ cho năm
        return new Date(fullYear, month - 1, day); // month - 1 vì tháng trong JS bắt đầu từ 0
    }

    public static addMonthsToDate(date: Date, months) {
        const newDate = date;
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
    }

    public static getFirstDateOfNextMonth(date: Date) {
        const nextMonth = date.getMonth() + 1;  // Lấy tháng tiếp theo (tháng 0 là tháng 1)
        const firstDateOfNextMonth = new Date(date.getFullYear(), nextMonth, 1);  // Đặt ngày là ngày 1 của tháng tiếp theo

        return firstDateOfNextMonth;
    }

    public static getFirstDayOfYear(date: Date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

        return firstDayOfYear;
    }

    public static convertDateToDDMMYYYY(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');  // Lấy ngày và thêm số 0 nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Lấy tháng và thêm số 0 nếu cần
        const year = date.getFullYear();  // Lấy năm đầy đủ

        return `${day}/${month}/${year}`;  // Kết hợp thành chuỗi ddMMyyyy
    }

    public static convertDateToMYYYY(date: Date) {
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        const formattedDate = `${month}/${year}`;

        return formattedDate;  // Kết hợp thành chuỗi M/yyyy
    }

    public static convertMYYYYtoDate(dateStr) {
        // Ensure the input is a valid MM/YYYY string
        const regex = /^([1-9]|1[0-2])\/(\d{4})$/;

        if (!regex.test(dateStr)) {
            console.log('Invalid format. Expected M/YYYY.');
            return null;
        }

        // Extract month and year
        const [month, year] = dateStr.split('/').map(Number);

        // Create and return the Date object
        return new Date(year, month - 1, 1); // Month is 0-based
    }

    // Define the invalid characters for file names
    private static invalidCharacters: string[] = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

    // Reserved filenames (mostly for Windows)
    private static reservedNames: string[] = [
        'CON', 'PRN', 'AUX', 'NUL',
        'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
        'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
    ];

    // Check for valid file extension
    private static hasValidExtension(fileName: string): boolean {
        const validExtensions = ['.doc', '.docx'];
        return validExtensions.some(ext => fileName.endsWith(ext));
    }

    // Check if the file name contains any invalid characters
    private static containsInvalidCharacters(fileName: string): boolean {
        return this.invalidCharacters.some(char => fileName.includes(char));
    }

    // Check if the file name is a reserved name
    private static isReservedName(fileName: string): boolean {
        return this.reservedNames.includes(fileName.toUpperCase());
    }

    // Main method to validate a file name
    public static isValidDocNameNoExtension(fileName: String): boolean {
        // Extract the file name without the extension
        const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));

        // // Check if the file name has the correct extension
        // if (!this.hasValidExtension(fileName)) {
        //     return false;
        // }

        // Check if the file name contains any invalid characters
        if (this.containsInvalidCharacters(nameWithoutExtension)) {
            return false;
        }

        // Check if the file name is a reserved name
        if (this.isReservedName(nameWithoutExtension)) {
            return false;
        }

        // Check if the file name length is valid (max 255 characters including extension)
        if (fileName.length > 255) {
            return false;
        }

        return true;
    }

    public static getMonthsBetweenDates(startDate: Date, endDate: Date): number {
        // Ensure the startDate is before the endDate
        if (startDate > endDate) {
            console.error("Start date must be before end date.");
            return 0;
        }

        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth(); // Month is zero-based
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();

        // Calculate the difference in months
        return (endYear - startYear) * 12 + (endMonth - startMonth);
    }


}
