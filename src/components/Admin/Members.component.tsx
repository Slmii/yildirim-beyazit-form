import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { Member } from '@prisma/client';
import { Button } from 'components/Button';
import { StandaloneField } from 'components/Form/Field';
import { MemberForm } from 'components/MemberForm';
import { Table } from 'components/Table';
import { useDevice } from 'lib/hooks/useDevice';
import { trpc } from 'lib/utils/trpc';
import { useMemo, useState } from 'react';

export const Members = () => {
	const [selected, setSelected] = useState<Member[]>([]);
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof Member>('name');
	const [search, setSearch] = useState<string>('');
	const [membersOpen, setMembersOpen] = useState(false);

	const { isMobile } = useDevice();
	const { data } = trpc.member.getAll.useQuery();

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
					<Button fullWidth={isMobile} disabled={!selected.length} startIcon="delete" variant="contained" color="error">
						Verwijderen
					</Button>
				</Stack>
			</Stack>
			<Box
				sx={{
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
							type: 'string'
						},
						address: {
							label: 'Adres',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						zip: {
							label: 'Postcode',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						city: {
							label: 'Woonplaats',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						phone: {
							label: 'Telefoon',
							sortable: true,
							alignment: 'left',
							type: 'string'
						},
						email: {
							label: 'Email',
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
				/>
			</Box>
			<Dialog maxWidth="md" fullWidth onClose={() => setMembersOpen(false)} open={membersOpen}>
				<DialogTitle>Lid toevoegen</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							pt: 2
						}}
					>
						<MemberForm
							isAdmin
							isLoading={false}
							onSubmit={data => {
								return new Promise<void>(resolve => {
									console.log(data);
									setTimeout(() => {
										resolve();
									}, 1000);
								});
							}}
						/>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
};
