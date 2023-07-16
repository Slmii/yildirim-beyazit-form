import { UserButton, useUser } from '@clerk/nextjs';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwticher.component';
import { useTranslation } from 'react-i18next';

export const Header = () => {
	const { user } = useUser();
	const { t } = useTranslation();

	return (
		<AppBar position="static">
			<Toolbar>
				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					sx={{
						flexGrow: 1
					}}
				>
					<Image
						alt="Logo"
						src="https://diyanet.nl/wp-content/uploads/2017/09/Diyanet-Site-Logo.png"
						width={50}
						height={50}
					/>
					<Typography variant="h6" component="div">
						{t('admin.title')}
					</Typography>
				</Stack>
				<Stack direction="row" spacing={2} alignItems="center">
					<LanguageSwitcher />
					<Typography variant="body1" component="div">
						{user?.username}
					</Typography>
					<UserButton afterSignOutUrl="/admin/sign-in" />
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
