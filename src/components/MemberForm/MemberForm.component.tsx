import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from 'components/Button';
import { Form } from 'components/Form';
import { DatePicker } from 'components/Form/DatePicker';
import { Field, IBANInput, TelField } from 'components/Form/Field';
import { schema } from 'lib/form.schema';
import { useDevice } from 'lib/hooks/useDevice';
import { MemberForm as IMemberForm } from 'lib/types/MemberForm.types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const MemberForm = ({
	isLoading,
	isAdmin = false,
	onSubmit,
	defaultValues
}: {
	defaultValues?: IMemberForm;
	isLoading: boolean;
	isAdmin?: boolean;
	onSubmit: (data: IMemberForm, reset: () => void) => Promise<void>;
}) => {
	const { t, i18n } = useTranslation();
	const { isMobile } = useDevice();

	const langToLocale = useMemo(() => {
		if (i18n.language === 'ar') {
			return 'ar-SA';
		} else if (i18n.language === 'tr') {
			return 'tr-TR';
		} else {
			return 'nl-NL';
		}
	}, [i18n.language]);

	const handleOnFormSubmit = async (values: IMemberForm, reset: () => void) => {
		await onSubmit(values, reset);
	};

	const isEdit = typeof defaultValues !== 'undefined';

	return (
		<Form<IMemberForm>
			action={reset => data => handleOnFormSubmit(data, reset)}
			defaultValues={{
				name: defaultValues?.name ?? '',
				birthday: defaultValues?.birthday ?? null,
				address: defaultValues?.address ?? '',
				zip: defaultValues?.zip ?? '',
				city: defaultValues?.city ?? '',
				email: defaultValues?.email ?? '',
				phone: defaultValues?.phone ?? '',
				bank: defaultValues?.bank ?? '',
				amount: defaultValues?.amount ?? 0
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
						<IBANInput required fullWidth name="bank" label={t('form.bank')} placeholder="NL00 BANK 0000 0000 00" />
						<Field required startIcon="euro" type="number" name="amount" label={t('form.amount')} placeholder="0.00" />
					</Stack>
					{!isAdmin ? (
						<>
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
						</>
					) : null}
					<Button fullWidth loading={isLoading} variant="contained" size="large" type="submit">
						{!isAdmin ? t('form.submit') : isEdit ? t('form.update') : t('form.add')}
					</Button>
				</>
			)}
		/>
	);
};
