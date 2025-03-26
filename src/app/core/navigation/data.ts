/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Chấm công',
        tooltip: 'Chấm công',
        type: 'basic',
        icon: 'fal fa-alarm-clock',
        link: '/pages/chamcong'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        tooltip: 'Dashboard',
        type: 'basic',
        icon: 'fa-light fa-gauge',
        link: '/dashboard'
    },

    {
        id: 'congtac',
        title: 'Công tác',
        tooltip: 'Đăng ký, duyệt phiếu công tác',
        type: 'basic',
        icon: 'fa-light fa-car-rear',
        link: '/pages/congtac'
    },
    {
        id: 'nghiphep',
        title: 'Nghỉ phép',
        tooltip: 'Đăng ký, duyệt phiếu nghỉ phép',
        type: 'basic',
        icon: 'fa-light fa-house-person-return',
        link: '/pages/nghiphep'
    },
    {
        id: 'giadiduong',
        title: 'Giấy đi đường',
        tooltip: 'Xem ký đóng dấu giấy đi đường',
        type: 'basic',
        icon: 'fa-light fa-stamp',
        link: '/pages/giaydiduong'
    },
    {
        id: 'hopdonglaodong',
        title: 'HĐ Lao động',
        tooltip: 'HĐ Lao động',
        type: 'basic',
        icon: 'fa-light fa-file-contract',
        link: '/pages/hopdonglaodong'

    },
    {
        id: 'kysofile',
        title: 'Ký số file',
        tooltip: 'Ký số file',
        type: 'basic',
        icon: 'fal fa-file-signature',
        link: '/pages/kysofile'
    },
    {
        id: 'canhan',
        title: 'Cá nhân',
        tooltip: 'Cá nhân',
        type: 'basic',
        icon: 'fal fa-file-signature',
        link: '/employe/canhan'
    },
    {
        id: 'hosonhansu',
        title: 'Hồ sơ nhân sự',
        tooltip: 'Hồ sơ nhân sự',
        type: 'basic',
        icon: 'fal fa-file-signature',
        link: '/employe/hosonhansu'
    },
];

export const compactNavigationByrole: FuseNavigationItem[] = [
    {
        id: 'quantri',
        title: 'Phân quyền',
        tooltip: 'Phân quyền',
        type: 'basic',
        icon: 'fa-light fa-screwdriver-wrench',
        link: '/pages/quantri'
    },
    {
        id: 'danhmuc',
        title: 'Danh mục',
        tooltip: 'Các danh mục hệ thống',
        type: 'aside',
        icon: 'fa-thin fa-list',
        children: [
            {
                id: 'danhmuc.xeoto',
                title: 'Danh mục xe ô tô',
                type: 'basic',
                icon: 'fal fa-car',
                link: '/category/xeoto'
            },
            {
                id: 'danhmuc.thetaxi',
                title: 'Danh mục thẻ taxi',
                type: 'basic',
                icon: 'fal fa-credit-card',
                link: '/category/thetaxi'
            },
            {
                id: 'danhmuc.chedonghi',
                title: 'Danh mục chê độ nghỉ',
                type: 'basic',
                icon: 'fal fa-credit-card',
                link: '/category/chedonghi'
            },
            {
                id: 'danhmuc.ngaylamviec',
                title: 'Danh mục ngày làm việc',
                type: 'basic',
                icon: 'fal fa-calendar-alt',
                link: '/category/ngaylamviec'
            },
            {
                id: 'danhmuc.thukylanhdao',
                title: 'Cấu hình thư ký lãnh đạo',
                type: 'basic',
                icon: 'fal fa-user-tie',
                link: '/category/thukylanhdao'
            },
            {
                id: 'danhmuc.filemau',
                title: 'Cấu hình hệ thống',
                type: 'basic',
                icon: 'fa-light fa-gear',
                link: '/category/filemau'
            },
            {
                id: 'danhmuc.treeapprove',
                title: 'Danh mục cây phê duyệt',
                type: 'basic',
                icon: 'fa-light fa-list-tree',
                link: '/category/treeapprove'
            },
        ]
    },
    {
        id: 'baocao',
        title: 'Báo cáo',
        tooltip: 'Thông kê báo cáo',
        type: 'basic',
        icon: 'fa-light fa-file-chart-column',
        link: '/pages/baocao'
    }
];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        tooltip: 'Dashboard',
        type: 'basic',
        icon: 'fa-light fa-gauge',
        link: '/dashboard'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        tooltip: 'Dashboard',
        type: 'basic',
        icon: 'fa-light fa-gauge',
        link: '/dashboard'
    }
];
