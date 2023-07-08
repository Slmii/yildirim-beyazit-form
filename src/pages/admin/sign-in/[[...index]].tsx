import { SignIn } from '@clerk/nextjs';
import Box from '@mui/material/Box';

const SignInPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<SignIn path="/admin/sign-in" routing="path" />
		</Box>
	);
};

export default SignInPage;
