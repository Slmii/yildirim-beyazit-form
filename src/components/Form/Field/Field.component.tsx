import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Icon } from 'components/Icon';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldProps, StandaloneFieldProps, UploadFieldProps } from './Field.types';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import slugify from 'slugify';
import { MuiTelInput } from 'mui-tel-input';
import React from 'react';
import { Icons, icons } from 'components/icons';

export const StandaloneField = React.forwardRef<HTMLInputElement, StandaloneFieldProps>(
	(
		{
			label,
			type = 'text',
			disabled = false,
			required = false,
			placeholder,
			startIcon,
			endIcon,
			fullWidth,
			readOnly = false,
			onChange,
			autoFocus = false,
			helperText,
			multiline = false,
			multilineRows = 4,
			maxLength,
			error,
			...field
		},
		ref
	) => {
		const labelId = `${slugify(field.name)}-label`;

		return (
			<TextField
				id={labelId}
				type={type}
				placeholder={placeholder}
				label={label}
				disabled={disabled}
				error={Boolean(error)}
				fullWidth={fullWidth}
				multiline={multiline}
				rows={multiline ? multilineRows : undefined}
				variant="outlined"
				inputProps={{
					inputMode: type === 'number' ? 'numeric' : undefined,
					pattern: type === 'number' ? '[0-9]*' : undefined,
					maxLength
				}}
				inputRef={ref}
				helperText={error || helperText}
				InputProps={{
					autoFocus,
					sx: {
						paddingRight: theme => (!multiline && maxLength ? `${theme.spacing(3)} !important;` : undefined),
						'& input[type=number]': {
							MozAppearance: 'textfield'
						},
						'& input[type=number]::-webkit-outer-spin-button': {
							WebkitAppearance: 'none',
							margin: 0
						},
						'& input[type=number]::-webkit-inner-spin-button': {
							WebkitAppearance: 'none',
							margin: 0
						}
					},
					readOnly,
					startAdornment: startIcon ? (
						<InputAdornment
							position="start"
							sx={{
								padding: 0.5
							}}
						>
							{!Object.keys(icons).some(icon => icon === startIcon) ? (
								startIcon
							) : (
								<Icon icon={startIcon as Icons} fontSize="small" />
							)}
						</InputAdornment>
					) : null,
					endAdornment: endIcon ? (
						<InputAdornment
							position="end"
							sx={{
								padding: 0.5
							}}
						>
							<Icon icon={endIcon} fontSize="small" />
						</InputAdornment>
					) : null
				}}
				{...field}
				onChange={onChange}
			/>
		);
	}
);

export const Field = (props: FieldProps) => {
	return (
		<Controller
			name={props.name}
			rules={{
				required: props.required
			}}
			render={({ field, fieldState }) => (
				<StandaloneField
					{...props}
					{...field}
					error={fieldState.error?.message}
					onChange={e => {
						field.onChange(e);
						props.onChange?.(e.target.value);
					}}
				/>
			)}
		/>
	);
};

export const UploadField = ({
	name,
	label,
	accept,
	onChange,
	disabled,
	required,
	fullWidth,
	multiple = false
}: UploadFieldProps) => {
	const { setValue } = useFormContext();
	const labelId = `${slugify(name)}-label`;

	return (
		<>
			<Controller
				name={name}
				rules={{
					required
				}}
				render={({ field }) => (
					<FormControl variant="outlined" fullWidth={fullWidth} required={required}>
						<label htmlFor={labelId}>
							<Box display="none">
								<input
									accept={accept}
									id={labelId}
									multiple={multiple}
									type="file"
									name={field.name}
									onChange={e => {
										const files = e.target.files ? Array.from(e.target.files) : [];

										setValue(name, {
											files: files,
											previews: files.map(file => URL.createObjectURL(file))
										});
										onChange?.(files);

										e.target.value = '';
									}}
									disabled={disabled}
								/>
							</Box>
							{label}
						</label>
					</FormControl>
				)}
			/>
		</>
	);
};

export const TelField = (props: FieldProps) => {
	const labelId = `${slugify(props.name)}-label`;

	return (
		<Controller
			name={props.name}
			rules={{
				required: props.required
			}}
			render={({ field, fieldState }) => (
				<MuiTelInput
					id={labelId}
					defaultCountry="NL"
					label={props.label}
					error={!!fieldState.error?.message}
					helperText={fieldState.error?.message}
					{...field}
					onChange={value => {
						field.onChange(value);
						props.onChange?.(value);
					}}
				/>
			)}
		/>
	);
};

export const IBANInput = (props: FieldProps) => {
	const formatIBAN = (value: string) => {
		// Remove all non-word characters and make it uppercase
		const strippedValue = value.replace(/\W/gi, '').toUpperCase();

		let formattedValue = '';

		for (let i = 0; i < strippedValue.length; i++) {
			formattedValue += strippedValue[i];

			if ((i + 1) % 4 === 0 && i !== strippedValue.length - 1) {
				formattedValue += ' ';
			}
		}

		return formattedValue;
	};

	return (
		<Controller
			name={props.name}
			rules={{
				required: props.required
			}}
			render={({ field, fieldState }) => (
				<StandaloneField
					{...props}
					{...field}
					error={fieldState.error?.message}
					onChange={e => {
						field.onChange(formatIBAN(e.target.value));
						props.onChange?.(formatIBAN(e.target.value));
					}}
				/>
			)}
		/>
	);
};
