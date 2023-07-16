export const readableNumber = (value: number, locale = 'nl-NL') => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'EUR'
	}).format(value);
};
