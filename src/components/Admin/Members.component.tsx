import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { Member } from '@prisma/client';
import { Button } from 'components/Button';
import { StandaloneField } from 'components/Form/Field';
import { MemberForm } from 'components/MemberForm';
import { Table } from 'components/Table';
import { useDevice } from 'lib/hooks/useDevice';
import { MemberForm as IMemberForm } from 'lib/types/MemberForm.types';
import { readableDate } from 'lib/utils/date.utill';
import { trpc } from 'lib/utils/trpc';
import { useMemo, useState } from 'react';

export const Members = () => {
	const [selected, setSelected] = useState<Member[]>([]);
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof Member>('name');
	const [search, setSearch] = useState<string>('');
	const [membersOpen, setMembersOpen] = useState(false);
	const [editMember, setEditMember] = useState<Member | undefined>(undefined);

	const { isMobile } = useDevice();

	const utils = trpc.useContext();
	const { data } = trpc.member.getAll.useQuery();
	const {
		mutateAsync: update,
		isLoading: updateIsLoading,
		isSuccess: updateIsSuccess,
		reset: updateReset,
		isError: updateIsError,
		error: updateError
	} = trpc.member.update.useMutation();
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

	const handleOnSubmitForm = async (values: IMemberForm) => {
		if (!values.birthday || !editMember) {
			return;
		}

		await update({
			...values,
			id: editMember.id,
			// Cast to date just to be sure
			birthday: values.birthday as unknown as string
		});

		await utils.member.getAll.invalidate();
		setMembersOpen(false);
	};

	const defaultFormValues = useMemo(() => {
		if (editMember) {
			return {
				address: editMember.address,
				amount: editMember.amount,
				bank: editMember.bank,
				city: editMember.city,
				email: editMember.email,
				name: editMember.name,
				phone: editMember.phone,
				zip: editMember.zip,
				birthday: editMember.birthday
			};
		}
	}, [editMember]);

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
						// birthday: {
						// 	label: 'Geb. datum',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'date'
						// },
						// address: {
						// 	label: 'Adres',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'string'
						// },
						// zip: {
						// 	label: 'Postcode',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'string'
						// },
						// city: {
						// 	label: 'Woonplaats',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'string'
						// },
						// email: {
						// 	label: 'Email',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'string'
						// },
						// phone: {
						// 	label: 'Telefoon',
						// 	sortable: true,
						// 	alignment: 'left',
						// 	type: 'string'
						// },
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
							type: 'string'
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
						}
					}}
					onExpand={(_id, member) => {
						return (
							<Box sx={{ p: 2 }}>
								<Stack direction="row" justifyContent="space-between">
									<Stack direction="column" spacing={0}>
										<Typography fontWeight="bold" variant="body1" color="textSecondary">
											Geboortedatum
										</Typography>
										<Typography variant="body1" color="textSecondary">
											{readableDate(member.birthday)}
										</Typography>
									</Stack>
									<Stack direction="column" spacing={0}>
										<Typography fontWeight="bold" variant="body1" color="textSecondary">
											Adres
										</Typography>
										<Typography variant="body1" color="textSecondary">
											{member.address}
										</Typography>
									</Stack>
									<Stack direction="column" spacing={0}>
										<Typography fontWeight="bold" variant="body1" color="textSecondary">
											Postcode
										</Typography>
										<Typography variant="body1" color="textSecondary">
											{member.zip}
										</Typography>
									</Stack>
									<Stack direction="column" spacing={0}>
										<Typography fontWeight="bold" variant="body1" color="textSecondary">
											Woonplaats
										</Typography>
										<Typography variant="body1" color="textSecondary">
											{member.city}
										</Typography>
									</Stack>
								</Stack>
							</Box>
						);
					}}
				/>
			</Box>
			<Dialog
				maxWidth="md"
				fullWidth
				onClose={() => {
					setMembersOpen(false);
					setEditMember(undefined);
				}}
				open={membersOpen}
			>
				<DialogTitle>Lid toevoegen</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							pt: 2
						}}
					>
						<MemberForm
							isAdmin
							isLoading={updateIsLoading}
							defaultValues={defaultFormValues}
							onSubmit={handleOnSubmitForm}
						/>
					</Box>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={updateIsSuccess || updateIsError}
				autoHideDuration={5000}
				onClose={updateReset}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Alert
					onClose={updateReset}
					severity={updateIsSuccess ? 'success' : 'error'}
					sx={{
						display: 'flex',
						alignItems: 'center',
						minWidth: '100%',
						height: 50,
						fontSize: 16,
						border: theme => `1px solid ${theme.palette.success.dark}`
					}}
				>
					{updateIsError ? updateError.message : 'Successvol geüpdate!'}
				</Alert>
			</Snackbar>
			<Snackbar
				open={deleteManyIsSuccess || deleteManyIsError}
				autoHideDuration={5000}
				onClose={deleteManyReset}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Alert
					onClose={deleteManyReset}
					severity={deleteManyIsSuccess ? 'success' : 'error'}
					sx={{
						display: 'flex',
						alignItems: 'center',
						minWidth: '100%',
						height: 50,
						fontSize: 16,
						border: theme => `1px solid ${theme.palette.success.dark}`
					}}
				>
					{deleteManyIsError ? deleteManyError.message : 'Successvol verwijderd!'}
				</Alert>
			</Snackbar>
		</>
	);
};
