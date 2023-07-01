import { Icons } from 'components/icons';

export interface FieldProps {
	name: string;
	label?: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	fullWidth?: boolean;
	readOnly?: boolean;
	onChange?: (value: string) => void;
	startIcon?: Icons | string;
	endIcon?: Icons;
	autoFocus?: boolean;
	helperText?: string;
	multiline?: boolean;
	multilineRows?: number;
	maxLength?: number;
}

export interface UploadFieldProps {
	name: string;
	label: JSX.Element;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	fullWidth?: boolean;
	onChange?: (attachment: Array<File>) => void;
}

export interface StandaloneFieldProps extends Omit<FieldProps, 'onChange'> {
	value: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
