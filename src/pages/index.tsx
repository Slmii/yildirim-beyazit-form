import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Form } from 'components/Form';
import { Field, IBANInput, TelField } from 'components/Form/Field';
import Head from 'next/head';
import { DatePicker } from 'components/Form/DatePicker';
import { Button } from 'components/Button';
import Image from 'next/image';
import { LanguageSwitcher } from 'components/LanguageSwitcher/LanguageSwitcher.component';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { schema } from 'lib/form.schema';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { nlNL as coreNlNL } from '@mui/material/locale';
import { nlNL } from '@mui/x-date-pickers/locales';
import { useDevice } from 'lib/hooks/useDevice';
import { trpc } from 'lib/utils/trpc';

interface IFormValues {
	name: string;
	birthday: string;
	address: string;
	zip: string;
	city: string;
	email: string;
	phone: string;
	bank: string;
	amount: number;
}

export default function Home() {
	const [isSuccess, setIsSuccess] = useState(false);

	const { isMobile } = useDevice();
	const { t, i18n } = useTranslation();
	const { mutateAsync, isLoading } = trpc.form.create.useMutation();

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
	}, [i18n.language]);

	const langToLocale = useMemo(() => {
		if (i18n.language === 'ar') {
			return 'ar-SA';
		} else if (i18n.language === 'tr') {
			return 'tr-TR';
		} else {
			return 'nl-NL';
		}
	}, [i18n.language]);

	const handleOnFormSubmit = async (values: IFormValues, reset: () => void) => {
		try {
			await mutateAsync(values);

			reset();
			setIsSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Head>
				<title>{t('title')}</title>
				<meta name="description" content={t('title')} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="https://diyanet.nl/wp-content/uploads/2017/09/Diyanet-Site-Logo.png" />
			</Head>
			<CacheProvider value={rtlCache}>
				<ThemeProvider theme={theme}>
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
							<Form<IFormValues>
								action={reset => data => handleOnFormSubmit(data, reset)}
								defaultValues={{
									name: '',
									birthday: '',
									address: '',
									zip: '',
									city: '',
									email: '',
									phone: '',
									bank: '',
									amount: 0
								}}
								schema={schema(t)}
								render={({ watch }) => (
									<>
										<Field required name="name" label={t('form.name')} />
										<DatePicker required name="birthday" label={t('form.birthday')} />
										<Stack direction={isMobile ? 'column' : 'row'} gap={2}>
											<Field required fullWidth name="address" label={t('form.address')} />
											<Field required fullWidth name="zip" label={t('form.zip')} />
											<Field required fullWidth name="city" label={t('form.city')} />
										</Stack>
										<Field required name="email" label={t('form.email')} />
										<TelField name="phone" label={t('form.phone')} />
										<Stack direction={isMobile ? 'column' : 'row'} gap={2}>
											<IBANInput
												required
												fullWidth
												name="bank"
												label={t('form.bank')}
												placeholder="NL00 BANK 0000 0000 00"
											/>
											<Field
												required
												startIcon="euro"
												type="number"
												name="amount"
												label={t('form.amount')}
												placeholder="0.00"
											/>
										</Stack>
										<div>
											<Typography color="primary.main" variant="h6" fontWeight="bold" component="h2">
												{t('agreement.title')}
											</Typography>
											<Typography
												variant="body2"
												fontWeight="light"
												component="p"
												dangerouslySetInnerHTML={{
													__html: t('agreement.text', {
														name: `<b>${watch('name').length ? watch('name') : '-'}</b>`,
														amount: `<b>${new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
															watch('amount')
														)}</b>`
													})
												}}
											/>
										</div>
										<div>
											<Typography color="primary.main" variant="h6" fontWeight="bold" component="h2">
												{t('date')}
											</Typography>
											<Typography variant="body2" fontWeight="light" component="p">
												{new Date().toLocaleDateString(langToLocale, {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})}
											</Typography>
										</div>
										<Button loading={isLoading} variant="contained" size="large" type="submit">
											{t('form.submit')}
										</Button>
									</>
								)}
							/>
							<Snackbar
								open={isSuccess}
								autoHideDuration={5000}
								onClose={() => setIsSuccess(false)}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
							>
								<Alert
									onClose={() => setIsSuccess(false)}
									severity="success"
									sx={{
										display: 'flex',
										alignItems: 'center',
										minWidth: '100%',
										height: 50,
										fontSize: 16,
										border: theme => `1px solid ${theme.palette.success.dark}`
									}}
								>
									{t('form.success')}
								</Alert>
							</Snackbar>
						</Stack>
					</Container>
				</ThemeProvider>
			</CacheProvider>
		</>
	);
}
