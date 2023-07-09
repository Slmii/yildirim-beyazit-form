export const readableDate = (date: Date) => {
	return new Intl.DateTimeFormat('nl-NL', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hourCycle: 'h23'
	}).format(date);
};
