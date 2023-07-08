import { UserButton, useUser } from '@clerk/nextjs';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export const Header = () => {
	const { user } = useUser();

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
						Yildirim Beyazit Moskee Administratie
					</Typography>
				</Stack>
				<Stack direction="row" spacing={2} alignItems="center">
					<Typography variant="body1" component="div">
						{user?.username}
					</Typography>
					<UserButton afterSignOutUrl="/admin/sign-in" />
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
