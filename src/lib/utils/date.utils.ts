export const readableDate = (date: Date, locale = 'nl-NL') => {
	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hourCycle: 'h23'
	}).format(date);
};

export const getMonths = (locale = 'nl-NL') => {
	// Get months with label and its index
	// Example output: [{ label: 'Januari', value: 0 }, ...]

	const months = [];
	const date = new Date();

	for (let i = 0; i < 12; i++) {
		date.setMonth(i);
		months.push({
			label: new Intl.DateTimeFormat(locale, {
				month: 'long'
			}).format(date),
			value: i
		});
	}

	return months;
};
