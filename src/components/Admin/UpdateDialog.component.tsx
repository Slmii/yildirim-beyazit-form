import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Member } from '@prisma/client';
import { MemberForm } from 'components/MemberForm';
import { trpc } from 'lib/utils/trpc.utils';
import { useMemo } from 'react';
import { MemberForm as IMemberForm } from 'lib/types/MemberForm.types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const UpdateDialog = ({ onClose, open, member }: { open: boolean; onClose: () => void; member?: Member }) => {
	const utils = trpc.useContext();
	const {
		mutateAsync: update,
		isLoading: updateIsLoading,
		isSuccess: updateIsSuccess,
		reset: updateReset,
		isError: updateIsError,
		error: updateError
	} = trpc.member.update.useMutation();

	const handleOnSubmitForm = async (values: IMemberForm) => {
		if (!values.birthday || !member) {
			return;
		}

		await update({
			...values,
			id: member.id,
			// Cast to date just to be sure
			birthday: values.birthday as unknown as string
		});

		await utils.member.getAll.invalidate();
		onClose();
	};

	const defaultFormValues = useMemo(() => {
		if (member) {
			return {
				address: member.address,
				amount: member.amount,
				bank: member.bank,
				city: member.city,
				email: member.email,
				name: member.name,
				phone: member.phone,
				zip: member.zip,
				birthday: member.birthday
			};
		}
	}, [member]);

	return (
		<>
			<Dialog maxWidth="md" fullWidth onClose={onClose} open={open}>
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
		</>
	);
};
