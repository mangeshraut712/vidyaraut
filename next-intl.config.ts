import { notFound } from 'next/navigation';
import { isLocale } from './src/i18n/config';
import { getMessages } from './src/i18n/messages';

export default async function getRequestConfig({ locale }: { locale: string }) {
    if (!isLocale(locale)) {
        notFound();
    }

    const messages = getMessages(locale);

    return {
        locale,
        messages,
    };
}
