import { Controller, useFormContext } from 'react-hook-form';
import { DatePickerProps } from './DatePicker.types';
import { DateField } from '@mui/x-date-pickers/DateField';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import { useTranslation } from 'react-i18next';

export const DatePicker = ({
	name,
	label,
	onChange,
	minDate,
	fullWidth,
	maxDate,
	required = false,
	disabled = false
}: DatePickerProps) => {
	const { control } = useFormContext();
	const { i18n } = useTranslation();

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required
			}}
			render={({ field, fieldState }) => (
				<Stack
					direction="column"
					spacing={0.25}
					sx={{
						position: 'relative',
						width: fullWidth ? '100%' : undefined
					}}
				>
					<DateField
						format={i18n.dir() === 'ltr' ? 'dd/MM/yyyy' : undefined}
						value={field.value as Date}
						onChange={date => {
							field.onChange(date);
							onChange?.(date);
						}}
						disabled={disabled}
						label={label}
						maxDate={maxDate}
						minDate={minDate}
						slotProps={{
							textField: {
								name
							}
						}}
					/>
					{fieldState.error && fieldState.error.message ? (
						<FormHelperText error>{fieldState.error.message}</FormHelperText>
					) : null}
				</Stack>
			)}
		/>
	);
};
