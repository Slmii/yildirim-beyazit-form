import { Icons } from 'components/icons';

export type Order = 'asc' | 'desc';

export type Column<T> = {
	[key in keyof Partial<T>]: ColumnOptions;
};

export interface TableProps<T> {
	rows: T[];
	columns: Column<T>;
	selectedRows?: T[];
	order?: Order;
	orderBy?: keyof T;
	actions?: ColumnActions<T>;
	setSelectedRows?: (rows: T[]) => void;
	setOrder?: (order: Order) => void;
	setOrderBy?: (orderBy: keyof T) => void;
	onExpand?: (rowId: number, data: T) => JSX.Element;
}

export interface ColumnOptions {
	label: string;
	sortable: boolean;
	alignment: 'left' | 'center' | 'right';
	type: 'string' | 'date' | 'currency' | 'number';
	icon?: Icons;
	iconAlt?: Icons;
}

export interface TableHeadProps<T> {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	columns: Column<T>;
	hasActions: boolean;
	hasExpand: boolean;
	hasCheckbox: boolean;
}

export interface TableCellProps<T> {
	columnId: keyof Column<T>;
	column: ColumnOptions;
	row: T;
}

export type ColumnActions<T> = {
	[key: string]: ColumnActionOptions<T>;
};

export interface ColumnActionOptions<T> {
	icon: Icons;
	label: string;
	action?: (rowId: string, data: T) => void;
	menu?: Array<{
		label: string;
		action: (rowId: string, data: T) => void;
	}>;
}

export interface TableCellActionProps<T> {
	rowId: string;
	row: T;
	action: ColumnActionOptions<T>;
}
