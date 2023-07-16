import { Icons } from 'components/icons';

export interface MenuProps {
	label: JSX.Element | ((open: boolean) => JSX.Element);
	id: string;
	menu: Menu[];
	fullWidth?: boolean;
	multiSelect?: boolean;
	onClose?: () => void;
}

interface Menu {
	id: string;
	label: string;
	icon?: Icons;
	image?: string;
	action?: () => void;
	disabled?: boolean;
	selected?: boolean;
	loading?: boolean;
	color?: 'primary' | 'secondary' | 'error' | 'success';
}
