export interface DatePickerProps {
	name: string;
	label?: string;
	required?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	onChange?: (date: Date | null) => void;
}
