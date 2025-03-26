import { FuseNavigationItem } from '@fuse/components/navigation';

export interface Navigation
{
    compact: FuseNavigationItem[];
    default: FuseNavigationItem[];
    futuristic: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}

export interface TitleHead {
    title: string;
    subTitle?: string;
    descript?: string;
    search?: boolean;
    filter?: boolean
}
