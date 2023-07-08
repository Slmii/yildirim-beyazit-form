import { Member } from '@prisma/client';
import { Icons } from 'components/icons';

export type Order = 'asc' | 'desc';

export type Column = {
	[key in keyof Partial<Member>]: ColumnOptions;
};

export interface TableProps {
	rows: Member[];
	selectedRows: Member[];
	columns: Column;
	order: Order;
	orderBy: keyof Member;
	actions?: ColumnActions;
	setSelectedRows: (rows: Member[]) => void;
	setOrder: (order: Order) => void;
	setOrderBy: (orderBy: keyof Member) => void;
}

export interface ColumnOptions {
	label: string;
	sortable: boolean;
	alignment: 'left' | 'center' | 'right';
	type: 'string' | 'date' | 'number';
	icon?: Icons;
	iconAlt?: Icons;
}

export interface TableHeadProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Member) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	columns: Column;
}

export interface TableCellProps {
	columnId: keyof Column;
	column: ColumnOptions;
	row: Member;
}

export type ColumnActions = {
	[key: string]: ColumnActionOptions;
};

export interface ColumnActionOptions {
	icon: Icons;
	label: string;
	action?: (rowId: string, data: Member) => void;
	menu?: Array<{
		label: string;
		action: (rowId: string, data: Member) => void;
	}>;
}

export interface TableCellActionProps {
	rowId: string;
	row: Member;
	action: ColumnActionOptions;
}
