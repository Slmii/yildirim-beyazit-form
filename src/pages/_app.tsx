import type { AppProps } from 'next/app';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { trpc } from 'lib/utils/trpc';

import 'lib/i18n';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App({ Component, pageProps }: AppProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Component {...pageProps} />
		</LocalizationProvider>
	);
}

export default trpc.withTRPC(App);
