import { locales } from './src/i18n/config'

export default {
    locales: [...locales],
    defaultLocale: 'en',
    messages: {
        en: () => import('./src/i18n/messages/en.json'),
        hi: () => import('./src/i18n/messages/hi.json'),
        mr: () => import('./src/i18n/messages/mr.json'),
    },
}
