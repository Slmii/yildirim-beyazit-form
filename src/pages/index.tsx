import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Head from 'next/head';
import Image from 'next/image';
import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher.component';
import { useTranslation } from 'react-i18next';
import { useDevice } from 'lib/hooks/useDevice';
import { MemberForm } from 'components/MemberForm';
import { trpc } from 'lib/utils/trpc';
import { MemberForm as IMemberForm } from 'lib/types/MemberForm.types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Home() {
	const { isMobile } = useDevice();
	const { t } = useTranslation();

	const { mutateAsync, isLoading, isSuccess, reset, isError, error } = trpc.member.create.useMutation();

	const handleOnFormSubmit = async (values: IMemberForm, reset: () => void) => {
		if (!values.birthday) {
			return;
		}

		await mutateAsync({
			...values,
			// Cast to date just to be sure
			birthday: values.birthday as unknown as string
		});

		reset();
	};

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name="description" content={t('title')} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="https://diyanet.nl/wp-content/uploads/2017/09/Diyanet-Site-Logo.png" />
			</Head>
			<Container maxWidth="md">
				<Stack
					direction="column"
					spacing={2}
					sx={{
						py: 3
					}}
				>
					<Stack
						direction={isMobile ? 'column' : 'row'}
						spacing={2}
						textAlign={isMobile ? 'center' : undefined}
						alignItems="center"
					>
						<Image
							alt="Logo"
							src="https://diyanet.nl/wp-content/uploads/2017/09/Diyanet-Site-Logo.png"
							width={100}
							height={100}
						/>
						<Stack direction="column">
							<Typography variant="h4" flexWrap="wrap" component="h1">
								{t('title')}
							</Typography>
							<Typography variant="h6" fontWeight="light" component="p">
								{t('subTitle')}
							</Typography>
						</Stack>
					</Stack>
					<LanguageSwitcher />
					<MemberForm onSubmit={handleOnFormSubmit} isLoading={isLoading} />
				</Stack>
			</Container>
			<Snackbar
				open={isSuccess || isError}
				autoHideDuration={5000}
				onClose={reset}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<Alert
					onClose={reset}
					severity={isSuccess ? 'success' : 'error'}
					sx={{
						display: 'flex',
						alignItems: 'center',
						minWidth: '100%',
						height: 50,
						fontSize: 16,
						border: theme => `1px solid ${theme.palette.success.dark}`
					}}
				>
					{isError ? error.message : t('form.success')}
				</Alert>
			</Snackbar>
		</>
	);
}
