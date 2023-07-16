import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocale = () => {
	const { i18n } = useTranslation();

	const langToLocale = useMemo(() => {
		if (i18n.language === 'ar') {
			return 'ar-SA';
		} else if (i18n.language === 'tr') {
			return 'tr-TR';
		} else {
			return 'nl-NL';
		}
	}, [i18n.language]);

	return langToLocale;
};
