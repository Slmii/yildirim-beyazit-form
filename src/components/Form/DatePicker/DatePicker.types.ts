export interface DatePickerProps {
	name: string;
	label?: string;
	required?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	onChange?: (date: string | null) => void;
}
