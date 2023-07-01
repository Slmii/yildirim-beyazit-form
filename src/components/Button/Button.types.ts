import { ButtonProps } from '@mui/material/Button';
import { Icons } from 'components/icons';

interface Button extends ButtonProps {
	tooltip?: string;
	loading?: boolean;
	endIcon?: Icons;
	startImage?: string;
	endImage?: string;
	component?: React.ElementType;
	target?: string;
}

export interface ButtonWithLabel extends Button {
	noLabel?: never;
	startIcon?: Icons;
}

export interface ButtonWithoutLabel extends Button {
	noLabel: boolean;
	startIcon: Icons;
	endIcon?: never;
}

export type CustomButtonProps = ButtonWithLabel | ButtonWithoutLabel;
