import FormLabel from '@mui/material/FormLabel';
import { LabelProps } from './Label.types';

export const Label = ({ required, label, radioOrCheckbox, disabled }: LabelProps) => {
	return (
		<FormLabel
			component="legend"
			required={required}
			sx={{
				fontSize: radioOrCheckbox ? 14 : 12,
				color: disabled ? 'text.secondary' : radioOrCheckbox ? 'text.primary' : 'text.secondary',
				fontWeight: radioOrCheckbox ? 'regular' : 'bold'
			}}
		>
			{label}
		</FormLabel>
	);
};
