import { Layout } from 'app/layout/layout.types';

// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig {
    layout: Layout;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    themes: Themes;
}

export interface Config {
    SMARTEVN: String,
    EVN_HUB: String,
    AppHome: String,
    Org_code: String,
    KyHDLD_TheoLo: Boolean,
}
/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 *
 * "Screens" are carried over to the BreakpointObserver for accessing them within
 * components, and they are required.
 *
 * "Themes" are required for Tailwind to generate themes.
 */
export const appConfig: AppConfig = {
    layout: 'compact',
    scheme: 'light',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px'
    },
    theme: 'theme-default',
    themes: [
        {
            id: 'theme-default',
            name: 'Default'
        },
        {
            id: 'theme-brand',
            name: 'Brand'
        },
        {
            id: 'theme-teal',
            name: 'Teal'
        },
        {
            id: 'theme-rose',
            name: 'Rose'
        },
        {
            id: 'theme-purple',
            name: 'Purple'
        },
        {
            id: 'theme-amber',
            name: 'Amber'
        }
    ]
};

export const LayoutConfig = {
    LAYOUT_MODE: 'LAYOUT_MODE',
    LAYOUT_THEME: 'LAYOUT_THEME',
    LAYOUT_COLOR: 'LAYOUT_COLOR',
}

/**
 * AuthConfig.
 */
export const AuthConfig = {
    TOKEN_HEADER_KEY: 'Authorization',
    ACCESS_TOKEN: 'accessToken',
    ACCESS_TOKEN_HUB: 'accessToken_hub',
    ACCESS_TOKEN_EX: 'accessToken_Ex',
    REFRESH_TOKEN: 'refreshToken',
    USER_INFOR: 'userinfor',
    DEVICE_ID: 'device_id',
};

/**
 * environment.
 */
 export const Environment = {
    production: true,
    expiration: 20,
    appId: 'SMARTEVN',
    appVersion: 'v2.1.4',
    AppHome: window.location.origin,
    Org_code: 'EVN',
    KyHDLD_TheoLo: true,
    Url_Origin: false,
};



export const API = {
    ORG_DOMAIN: '.evn.com.vn',
    IMG: 'https://hrmsimage.evn.com.vn/images',
    SMARTEVN: 'http://10.1.117.254:8080',
    EVN_HUB: 'http://10.1.117.254:8080',
    EVN_KYSO: 'http://10.1.117.254:8080',
    DO: 'https://gwdoffice-test.evn.com.vn/'
}
