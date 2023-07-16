import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React, { useState } from 'react';
import { Column, ColumnOptions, TableCellActionProps, TableCellProps, TableHeadProps, TableProps } from './Table.types';
import { IconButton } from 'components/IconButton';
import { readableDate } from 'lib/utils/date.utils';
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';
import { useLocale } from 'lib/hooks/useLocale';
import { readableNumber } from 'lib/utils/number.utils';

function TableCellAction<T>({ rowId, row, action }: TableCellActionProps<T>) {
	// if (action.menu) {
	// 	return (
	// 		<Menu
	// 			id='table-cell'
	// 			label={<IconButton title={action.label} icon={action.icon} />}
	// 			subMenu={action.menu.map(menu => ({
	// 				label: menu.label,
	// 				action: () => menu.action(rowId, row)
	// 			}))}
	// 		/>
	// 	);
	// }

	return (
		<IconButton
			icon={action.icon}
			tooltip={action.label}
			color="default"
			onClick={e => {
				e.stopPropagation();
				action.action?.(rowId, row);
			}}
		/>
	);
}

function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

function TableCell<T extends { id: number }>({ columnId, column, row }: TableCellProps<T>) {
	const locale = useLocale();

	const renderValue = () => {
		const value = row[columnId as keyof Column<T>];

		if (typeof value !== 'boolean' && !value) {
			return '-';
		}

		if (column.type === 'date' && isDate(value)) {
			return readableDate(value, locale);
		}

		if (column.type === 'currency') {
			return readableNumber(Number(value), locale);
		}

		return (
			<Box
				sx={{
					cursor: 'pointer',
					display: '-webkit-box',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					WebkitLineClamp: 1,
					WebkitBoxOrient: 'vertical'
				}}
			>
				{column.type === 'jsx' ? value : value.toString()}
			</Box>
		);
	};

	return (
		<MuiTableCell
			key={`${columnId as string}${row.id}`}
			align={column.alignment}
			sx={{
				color: 'text.primary'
			}}
		>
			{renderValue()}
		</MuiTableCell>
	);
}

function TableHead<T>({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	columns,
	hasActions,
	hasExpand,
	hasCheckbox
}: TableHeadProps<T>) {
	const { t } = useTranslation();
	const createSortHandler = (property: keyof Column<T>) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	const mappedColumns = Object.entries(columns) as [keyof T, ColumnOptions][];

	return (
		<MuiTableHead>
			<TableRow>
				{hasExpand && <MuiTableCell padding="checkbox" />}
				{hasCheckbox && (
					<MuiTableCell padding="checkbox">
						<Checkbox
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all'
							}}
							size="small"
						/>
					</MuiTableCell>
				)}
				{mappedColumns.map(([columnId, column]) => (
					<MuiTableCell
						key={columnId as string}
						align={column.alignment}
						sortDirection={orderBy === columnId ? order : false}
					>
						{column.sortable ? (
							<TableSortLabel
								active={orderBy === columnId}
								direction={orderBy === columnId ? order : 'asc'}
								onClick={createSortHandler(columnId as keyof Column<T>)}
							>
								{column.label}
								{orderBy === columnId ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							<>{column.label}</>
						)}
					</MuiTableCell>
				))}
				{hasActions && <MuiTableCell align="right">{t('admin.columns.actions')}</MuiTableCell>}
			</TableRow>
		</MuiTableHead>
	);
}

export function Table<T extends { id: number }>({
	rows,
	selectedRows,
	setSelectedRows,
	columns,
	actions,
	order,
	orderBy,
	size,
	setOrder,
	setOrderBy,
	onExpand
}: TableProps<T>) {
	const [expandedId, setExpandedId] = useState(0);

	const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder?.(isAsc ? 'desc' : 'asc');
		setOrderBy?.(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!setSelectedRows) {
			return;
		}

		if (event.target.checked) {
			setSelectedRows(rows);
			return;
		}

		setSelectedRows([]);
	};

	const handleOnRowClick = (_event: React.MouseEvent<unknown>, asset: T) => {
		if (!selectedRows || !setSelectedRows) {
			return;
		}

		const selectedIndex = selectedRows.findIndex(({ id }) => id === asset.id);

		// Append or remove if exists
		let newSelected: T[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedRows, asset);
		} else {
			newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
		}

		setSelectedRows(newSelected);
	};

	const handleCheckboxClick = (asset: T) => {
		if (!selectedRows || !setSelectedRows) {
			return;
		}

		const selectedIndex = selectedRows.findIndex(({ id }) => id === asset.id);
		let newSelected: T[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedRows, asset);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedRows.slice(1));
		} else if (selectedIndex === selectedRows.length - 1) {
			newSelected = newSelected.concat(selectedRows.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
		}

		setSelectedRows(newSelected);
	};

	const isSelected = (assetId: number) => selectedRows?.findIndex(asset => asset.id === assetId) !== -1;

	return (
		<TableContainer>
			<MuiTable sx={{ minWidth: 650 }} size={size} aria-labelledby="members-table">
				<TableHead<T>
					numSelected={selectedRows?.length ?? 0}
					order={order ?? 'asc'}
					orderBy={orderBy ? orderBy.toString() : 'id'}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={rows.length}
					columns={columns}
					hasActions={!!actions}
					hasExpand={!!onExpand}
					hasCheckbox={!!setSelectedRows}
				/>
				<TableBody>
					{rows.map(asset => {
						const isItemSelected = isSelected(asset.id);
						const labelId = `enhanced-table-checkbox-${asset.id}`;
						const isExpanded = expandedId === asset.id;

						return (
							<React.Fragment key={asset.id}>
								<TableRow
									hover
									onClick={event => handleOnRowClick(event, asset)}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									selected={isItemSelected}
								>
									{onExpand && (
										<MuiTableCell padding="checkbox">
											<IconButton
												icon={isExpanded ? 'expandLess' : 'expandMore'}
												tooltip={isExpanded ? 'Minder' : 'Meer'}
												onClick={e => {
													e.stopPropagation();
													setExpandedId(isExpanded ? 0 : asset.id);
												}}
											/>
										</MuiTableCell>
									)}
									{setSelectedRows && (
										<MuiTableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId
												}}
												size="small"
												onClick={e => {
													e.stopPropagation();
													handleCheckboxClick(asset);
												}}
											/>
										</MuiTableCell>
									)}
									{Object.entries(columns).map(([columnId, column]) => (
										<TableCell<T>
											key={`${columnId}${asset.id}`}
											row={asset}
											columnId={columnId as keyof Column<T>}
											column={column}
										/>
									))}
									{actions && (
										<MuiTableCell align="right">
											{Object.entries(actions).map(([key, action]) => {
												return <TableCellAction key={key} action={action} row={asset} rowId={asset.id.toString()} />;
											})}
										</MuiTableCell>
									)}
								</TableRow>
								<TableRow
									hover
									sx={{
										backgroundColor: 'rgba(0, 0, 0, 0.04)',
										'&:hover': {
											backgroundColor: 'rgba(0, 0, 0, 0.04) !important'
										}
									}}
								>
									<MuiTableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(columns).length + 3}>
										<Collapse in={isExpanded} timeout="auto" unmountOnExit>
											{onExpand?.(asset.id, asset)}
										</Collapse>
									</MuiTableCell>
								</TableRow>
							</React.Fragment>
						);
					})}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
}
