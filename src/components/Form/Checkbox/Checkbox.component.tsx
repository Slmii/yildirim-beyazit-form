import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import { Label } from 'components/Form/Label';

export const Checkbox = ({
	name,
	label,
	disabled,
	onChange
}: {
	label?: string;
	name: string;
	disabled?: boolean;
	onChange?: (checked: boolean) => void;
}) => {
	return (
		<FormGroup row>
			<FormControlLabel
				className={!label ? 'no-label' : undefined}
				control={
					<Controller
						name={name}
						render={({ field }) => (
							<MuiCheckbox
								inputProps={{ 'aria-labelledby': `${slugify(name)}-checkbox` }}
								disabled={disabled}
								checked={field.value}
								size="small"
								color="primary"
								onChange={(e, checked) => {
									field.onChange(e);
									onChange?.(checked);
								}}
							/>
						)}
					/>
				}
				label={label ? <Label label={label} radioOrCheckbox disabled={disabled} /> : undefined}
				labelPlacement="end"
			/>
		</FormGroup>
	);
};

export const StandaloneCheckbox = ({
	name,
	label,
	checked,
	disabled,
	onChange
}: {
	label?: string;
	name: string;
	checked: boolean;
	disabled?: boolean;
	onChange?: (checked: boolean) => void;
}) => {
	return (
		<FormGroup row>
			<FormControlLabel
				className={!label ? 'no-label' : undefined}
				control={
					<MuiCheckbox
						inputProps={{ 'aria-labelledby': `${slugify(name)}-checkbox` }}
						disabled={disabled}
						checked={checked}
						size="small"
						color="primary"
						onChange={(_, checked) => {
							onChange?.(checked);
						}}
					/>
				}
				label={label ? <Label label={label} radioOrCheckbox disabled={disabled} /> : undefined}
				labelPlacement="end"
			/>
		</FormGroup>
	);
};
