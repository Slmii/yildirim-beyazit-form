import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Member } from '@prisma/client';
import { Table } from 'components/Table';
import { useLocale } from 'lib/hooks/useLocale';
import { getMonths } from 'lib/utils/date.utils';
import { trpc } from 'lib/utils/trpc.utils';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { readableNumber } from 'lib/utils/number.utils';
import { Icon } from 'components/Icon';
import { IconButton } from 'components/IconButton';

export const PaymentsDialog = ({ onClose, open, member }: { open: boolean; onClose: () => void; member?: Member }) => {
	const locale = useLocale();
	const { t } = useTranslation();

	const { data, isLoading } = trpc.payments.getById.useQuery(
		{
			memberId: member?.id ?? 0
		},
		{
			enabled: !!member
		}
	);

	const payments = useMemo(() => {
		if (!data) {
			return [];
		}

		let years = Array.from(new Set(data.map(payment => payment.createdAt.getFullYear())));

		// Always add 1 year in advance
		years.push(years[years.length - 1] + 1);

		// Sort years
		years = years.sort((a, b) => b - a);

		return years.map(year => {
			const yearPayments = data.filter(payment => payment.createdAt.getFullYear() === year);

			return {
				year,
				months: getMonths(locale).map(month => ({
					month: month.label,
					isPaid: yearPayments.some(payment => payment.createdAt.getMonth() === month.value)
				}))
			};
		});
	}, [data, locale]);

	const isFetched = !!data && !isLoading;

	return (
		<Dialog maxWidth="xl" fullWidth onClose={onClose} open={open}>
			<DialogTitle>{t('admin.tooltips.payments')}</DialogTitle>
			<DialogContent>
				<Stack
					direction="column"
					spacing={2}
					sx={{
						pt: 2
					}}
				>
					<Stack
						direction="row"
						spacing={1}
						alignItems="flex-end"
						sx={{
							fontWeight: 'bold'
						}}
					>
						<Chip
							label={member?.name}
							sx={{
								fontWeight: 'bold'
							}}
							variant="outlined"
						/>
						<Chip
							label={`IBAN: ${member?.bank}`}
							sx={{
								fontWeight: 'bold'
							}}
							variant="outlined"
						/>
						<Chip
							label={`${t('admin.columns.amount')}: ${readableNumber(member?.amount ?? 0, locale)}`}
							sx={{
								fontWeight: 'bold'
							}}
							variant="outlined"
						/>
					</Stack>
					{isFetched ? (
						<Table
							size="small"
							columns={{
								year: {
									label: t('admin.columns.year'),
									sortable: false,
									alignment: 'center',
									type: 'string'
								},
								...getMonths(locale).reduce(
									(acc, month) => ({
										...acc,
										[month.label]: {
											label: month.label.charAt(0).toUpperCase() + month.label.slice(1),
											sortable: false,
											type: 'jsx',
											alignment: 'center'
										}
									}),
									{}
								)
							}}
							rows={payments.map(year => ({
								id: year.year,
								year: year.year,
								...year.months.reduce(
									(acc, month) => ({
										...acc,
										[month.month]: (
											<>
												{month.isPaid ? (
													<Icon icon="check" color="success" />
												) : (
													<IconButton icon="pay" color="error" tooltip="Betaling verwerken" />
												)}
											</>
										)
									}),
									{}
								)
							}))}
						/>
					) : (
						<CircularProgress size={40} />
					)}
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
