import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Member } from '@prisma/client';
import { Table } from 'components/Table';
import { getMonths } from 'lib/utils/date.utils';

export const PaymentsDialog = ({ onClose, open, member }: { open: boolean; onClose: () => void; member?: Member }) => {
	return (
		<Dialog maxWidth="xl" fullWidth onClose={onClose} open={open}>
			<DialogTitle>Betalingen</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						pt: 2
					}}
				>
					<Table
						columns={{
							year: {
								label: 'Jaar',
								sortable: true,
								alignment: 'left',
								type: 'string'
							},
							...getMonths().reduce(
								(acc, month) => ({
									...acc,
									[month.label]: {
										label: month.label.charAt(0).toUpperCase() + month.label.slice(1),
										sortable: false,
										type: 'string',
										alignment: 'left'
									}
								}),
								{}
							)
						}}
						rows={[
							{
								id: 2023,
								year: 2023,
								januari: 'Betaald',
								februari: 'Betaald',
								maart: 'Betaald',
								april: 'Betaald',
								mei: 'Betaald',
								juni: 'Betaald',
								juli: 'Betaald',
								augustus: 'Betaald',
								september: 'Betaald',
								oktober: 'Betaald',
								november: 'Betaald',
								december: 'Betaald'
							}
						]}
					/>
				</Box>
			</DialogContent>
		</Dialog>
	);
};
