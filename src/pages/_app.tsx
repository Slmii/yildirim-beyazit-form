import type { AppProps } from 'next/app';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'lib/i18n';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Component {...pageProps} />
		</LocalizationProvider>
	);
}
