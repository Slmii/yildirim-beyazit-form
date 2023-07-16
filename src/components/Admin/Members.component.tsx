import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { Member } from '@prisma/client';
import { Button } from 'components/Button';
import { StandaloneField } from 'components/Form/Field';
import { Table } from 'components/Table';
import { useDevice } from 'lib/hooks/useDevice';
import { readableDate } from 'lib/utils/date.utils';
import { trpc } from 'lib/utils/trpc.utils';
import { useMemo, useState } from 'react';
import { PaymentsDialog } from './PaymentsDialog.component';
import { UpdateDialog } from './UpdateDialog.component';

export const Members = () => {
	const [selected, setSelected] = useState<Member[]>([]);
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof Member>('name');
	const [search, setSearch] = useState<string>('');

	const [membersOpen, setMembersOpen] = useState(false);
	const [editMember, setEditMember] = useState<Member | undefined>(undefined);
	const [paymentsOpen, setPaymentsOpen] = useState(false);
	const [paymentsMember, setPaymentsMember] = useState<Member | undefined>(undefined);

	const { isMobile } = useDevice();

	const utils = trpc.useContext();
	const { data } = trpc.member.getAll.useQuery();
	const {
		mutateAsync: deleteMany,
		isLoading: deleteManyIsLoading,
		isSuccess: deleteManyIsSuccess,
		reset: deleteManyReset,
		isError: deleteManyIsError,
		error: deleteManyError
	} = trpc.member.deleteMany.useMutation();

	const members = useMemo(() => {
		if (!data) {
			return [];
		}

		// Search
		const filtered = data.filter(member => {
			if (!search) {
				return true;
			}

			return member.name.toLowerCase().includes(search.toLowerCase());
		});

		// Sort
		const sorted = filtered.sort((a, b) => {
			if (a[orderBy] < b[orderBy]) {
				return order === 'asc' ? -1 : 1;
			}

			if (a[orderBy] > b[orderBy]) {
				return order === 'asc' ? 1 : -1;
			}

			return 0;
		});

		return sorted;
	}, [data, order, orderBy, search]);

	const handleOnDelete = async () => {
		if (!selected.length) {
			return;
		}

		await deleteMany(selected.map(member => member.id));
		await utils.member.getAll.invalidate();

		setSelected([]);
	};

	return (
		<>
			<Stack
				direction={isMobile ? 'column' : 'row'}
				sx={{ p: 2 }}
				spacing={2}
				alignItems="center"
				justifyContent="space-between"
			>
				<StandaloneField
					fullWidth
					name="search"
					value={search}
					onChange={e => setSearch(e.target.value)}
					label="Zoeken"
				/>
				<Stack
					width={isMobile ? '100%' : undefined}
					direction={isMobile ? 'column' : 'row'}
					spacing={2}
					justifyContent="flex-end"
				>
					<Button fullWidth={isMobile} startIcon="add" variant="contained" onClick={() => setMembersOpen(true)}>
						Toevoegen
					</Button>
					<Button
						fullWidth={isMobile}
						disabled={!selected.length}
						loading={deleteManyIsLoading}
						onClick={handleOnDelete}
						startIcon="delete"
						variant="contained"
						color="error"
					>
						Verwijderen
					</Button>
				</Stack>
			</Stack>
			<Box
				sx={{
					px: 4,
					height: 'calc(100vh - 155px)',
					overflowY: 'auto'
				}}
			>
				<Table
					columns={{
						name: {
							label: 'Naam',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						bank: {
							label: 'IBAN',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						amount: {
							label: 'Maandelijkse contributie',
							sortable: true,
							alignment: 'left',
							type: 'currency'
						},
						createdAt: {
							label: 'Inschrijfdatum',
							sortable: true,
							alignment: 'left',
							type: 'date'
						}
					}}
					order={order}
					orderBy={orderBy}
					rows={members}
					setOrder={setOrder}
					setOrderBy={setOrderBy}
					selectedRows={selected}
					setSelectedRows={setSelected}
					actions={{
						edit: {
							icon: 'edit',
							label: 'Bewerken',
							action: (_row, member) => {
								setMembersOpen(true);
								setEditMember(member);
							}
						},
						payment: {
							icon: 'payment',
							label: 'Betalingen',
							action: (_row, member) => {
								setPaymentsOpen(true);
								setPaymentsMember(member);
							}
						}
					}}
					onExpand={(_id, member) => <ExpandedComponent member={member} />}
				/>
			</Box>
			<UpdateDialog
				open={membersOpen}
				onClose={() => {
					setMembersOpen(false);
					setEditMember(undefined);
				}}
				member={editMember}
			/>
			<PaymentsDialog
				open={paymentsOpen}
				onClose={() => {
					setPaymentsOpen(false);
					setPaymentsMember(undefined);
				}}
				member={paymentsMember}
			/>
			<Snackbar
				open={deleteManyIsSuccess}
				autoHideDuration={5000}
				onClose={deleteManyReset}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Alert
					onClose={deleteManyReset}
					severity="success"
					sx={{
						display: 'flex',
						alignItems: 'center',
						minWidth: '100%',
						height: 50,
						fontSize: 16,
						border: theme => `1px solid ${theme.palette.success.dark}`
					}}
				>
					Successvol verwijderd!
				</Alert>
			</Snackbar>
			<Snackbar
				open={deleteManyIsError}
				autoHideDuration={5000}
				onClose={deleteManyReset}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Alert
					onClose={deleteManyReset}
					severity="error"
					sx={{
						display: 'flex',
						alignItems: 'center',
						minWidth: '100%',
						height: 50,
						fontSize: 16,
						border: theme => `1px solid ${theme.palette.error.dark}`
					}}
				>
					{deleteManyError?.message}
				</Alert>
			</Snackbar>
		</>
	);
};

const ExpandedComponent = ({ member }: { member: Member }) => {
	return (
		<Box sx={{ p: 2 }}>
			<Stack direction="row" spacing={4}>
				<Stack direction="column" spacing={0}>
					<Typography fontWeight="bold" variant="body2" color="textSecondary">
						Geboortedatum
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{readableDate(member.birthday)}
					</Typography>
				</Stack>
				<Stack direction="column" spacing={0}>
					<Typography fontWeight="bold" variant="body2" color="textSecondary">
						Adres
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{member.address}
					</Typography>
				</Stack>
				<Stack direction="column" spacing={0}>
					<Typography fontWeight="bold" variant="body2" color="textSecondary">
						Email
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{member.email}
					</Typography>
				</Stack>
				<Stack direction="column" spacing={0}>
					<Typography fontWeight="bold" variant="body2" color="textSecondary">
						Telefoon
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{member.phone}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};
