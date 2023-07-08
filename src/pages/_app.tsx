import type { AppProps } from 'next/app';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { trpc } from 'lib/utils/trpc';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { nlNL as coreNlNL } from '@mui/material/locale';
import { nlNL } from '@mui/x-date-pickers/locales';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { ClerkProvider } from '@clerk/nextjs';

import '../styles/app.css';
import 'lib/i18n';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// eslint-disable-next-line react-refresh/only-export-components
function App({ Component, pageProps }: AppProps) {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language === 'ar') {
			document.dir = 'rtl';
		} else {
			document.dir = 'ltr';
		}
	}, [i18n.language]);

	const theme = useMemo(() => {
		let theme = createTheme(
			{
				direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
			},
			{
				nlNL, // x-date-pickers translations
				coreNlNL // core translations
			}
		);

		theme = responsiveFontSizes(theme);

		return theme;
	}, [i18n.language]);

	const rtlCache = useMemo(() => {
		const stylisPlugins = [prefixer];
		if (i18n.language === 'ar') {
			stylisPlugins.push(rtlPlugin);
		}

		return createCache({
			key: `mui${i18n.dir()}`,
			stylisPlugins
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.language]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<CacheProvider value={rtlCache}>
				<ThemeProvider theme={theme}>
					<ClerkProvider
						{...pageProps}
						appearance={{
							variables: {
								colorPrimary: theme.palette.primary.main,
								colorText: theme.palette.text.primary,
								fontFamily: theme.typography.fontFamily,
								borderRadius: `${theme.shape.borderRadius}px`,
								spacing: theme.spacing,
								colorDanger: theme.palette.error.main,
								colorSuccess: theme.palette.success.main,
								colorTextSecondary: theme.palette.text.secondary,
								colorTextOnPrimaryBackground: theme.palette.primary.contrastText,
								colorBackground: theme.palette.background.default,
								colorInputText: theme.palette.text.primary,
								colorWarning: theme.palette.warning.main,
								fontWeight: theme.typography.fontWeightRegular
							},
							elements: {
								footer: {
									display: 'none'
								}
							}
						}}
					>
						<Component {...pageProps} />
					</ClerkProvider>
				</ThemeProvider>
			</CacheProvider>
		</LocalizationProvider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export default trpc.withTRPC(App);
