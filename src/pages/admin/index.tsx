import Head from 'next/head';
import { Header } from 'components/Admin/Header.component';
import { Members } from 'components/Admin';
import Box from '@mui/material/Box';

export default function AdminPage() {
	return (
		<>
			<Head>
				<title>Yildirim Beyazit Moskee Administratie</title>
				<meta name="description" content="Yildirim Beyazit Moskee Administratie" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="https://diyanet.nl/wp-content/uploads/2017/09/Diyanet-Site-Logo.png" />
			</Head>
			<Header />
			<Box component="main">
				<Members />
			</Box>
		</>
	);
}
