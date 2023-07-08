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
import React from 'react';
import { Column, TableCellActionProps, TableCellProps, TableHeadProps, TableProps } from './Table.types';
import { Member } from '@prisma/client';
import { IconButton } from 'components/IconButton';

function TableCellAction({ rowId, row, action }: TableCellActionProps) {
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

const TableCell = React.memo(({ columnId, column, row }: TableCellProps) => {
	const renderValue = () => {
		const value = row[columnId as keyof Column];

		if (typeof value !== 'boolean' && !value) {
			return '-';
		}

		if (value instanceof Date) {
			return new Intl.DateTimeFormat('nl-NL', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
				hourCycle: 'h23'
			}).format(value);
		}

		if (typeof value === 'number') {
			return new Intl.NumberFormat('nl-NL', {
				style: 'currency',
				currency: 'EUR'
			}).format(value);
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
				{value.toString()}
			</Box>
		);
	};

	return (
		<MuiTableCell key={`${columnId}${row.id}`} align={column.alignment}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					color: 'text.primary'
				}}
			>
				{renderValue()}
			</Box>
		</MuiTableCell>
	);
});

const TableHead = ({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	columns
}: TableHeadProps) => {
	const createSortHandler = (property: keyof Column) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<MuiTableHead>
			<TableRow>
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
				{Object.entries(columns).map(([columnId, column]) => (
					<MuiTableCell key={columnId} align={column.alignment} sortDirection={orderBy === columnId ? order : false}>
						{column.sortable ? (
							<TableSortLabel
								active={orderBy === columnId}
								direction={orderBy === columnId ? order : 'asc'}
								onClick={createSortHandler(columnId as keyof Column)}
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
				<MuiTableCell align="right">Acties</MuiTableCell>
			</TableRow>
		</MuiTableHead>
	);
};

export const Table = ({
	rows,
	selectedRows,
	setSelectedRows,
	columns,
	actions,
	order,
	orderBy,
	setOrder,
	setOrderBy
}: TableProps) => {
	const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Member) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelectedRows(rows);
			return;
		}

		setSelectedRows([]);
	};

	const handleOnRowClick = (_event: React.MouseEvent<unknown>, asset: Member) => {
		const selectedIndex = selectedRows.findIndex(({ id }) => id === asset.id);

		// Append or remove if exists
		let newSelected: Member[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedRows, asset);
		} else {
			newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
		}

		setSelectedRows(newSelected);
	};

	const handleCheckboxClick = (asset: Member) => {
		const selectedIndex = selectedRows.findIndex(({ id }) => id === asset.id);
		let newSelected: Member[] = [];

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

	const isSelected = (assetId: number) => selectedRows.findIndex(asset => asset.id === assetId) !== -1;

	return (
		<TableContainer>
			<MuiTable sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
				<TableHead
					numSelected={selectedRows.length}
					order={order}
					orderBy={orderBy}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={rows.length}
					columns={columns}
				/>
				<TableBody>
					{rows.map(asset => {
						const isItemSelected = isSelected(asset.id);
						const labelId = `enhanced-table-checkbox-${asset.id}`;

						return (
							<TableRow
								hover
								onClick={event => handleOnRowClick(event, asset)}
								role="checkbox"
								aria-checked={isItemSelected}
								tabIndex={-1}
								key={asset.id}
								selected={isItemSelected}
							>
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
								{Object.entries(columns).map(([columnId, column]) => (
									<TableCell
										key={`${columnId}${asset.id}`}
										row={asset}
										columnId={columnId as keyof Column}
										column={column}
									/>
								))}
								<MuiTableCell align="right">
									{actions && (
										<>
											{Object.entries(actions).map(([key, action]) => {
												return <TableCellAction key={key} action={action} row={asset} rowId={asset.id.toString()} />;
											})}
										</>
									)}
								</MuiTableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
};
