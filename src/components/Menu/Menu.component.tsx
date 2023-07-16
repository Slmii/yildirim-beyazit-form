import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { icons } from 'components/icons';
import { MenuProps } from './Menu.types';
import Divider from '@mui/material/Divider';
import slugify from 'slugify';
import CircularProgress from '@mui/material/CircularProgress';

export const Menu = ({ label, id, menu, fullWidth, multiSelect, onClose }: MenuProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [width, setWidth] = useState(0);

	const handleOnMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
		setWidth(e.currentTarget.getBoundingClientRect().width);
	};

	const handleOnMenuClose = (action?: () => void) => {
		action?.();

		// If action defined (MenuItem) and multiSelect is true we keep the Menu open
		if (action && !multiSelect) {
			setAnchorEl(null);
			onClose?.();
		}
		// If there is no action defined, it means this is the onClose of the Menu itself (outside click)
		else if (!action) {
			setAnchorEl(null);
			onClose?.();
		}
	};

	return (
		<>
			{React.cloneElement(typeof label === 'function' ? label(!!anchorEl) : label, {
				onClick: menu
					? // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-mixed-spaces-and-tabs
					  (e: any) => {
							(typeof label === 'function' ? label(!!anchorEl) : label).props.onClick?.();
							handleOnMenuOpen(e);
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: undefined
			})}
			<MuiMenu
				id={`${slugify(id)}-menu`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => handleOnMenuClose()}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				PaperProps={{
					style: {
						minWidth: fullWidth ? width : undefined
					}
				}}
			>
				{menu.map(({ id, label, icon, color, action, image, disabled, loading, selected }, i) => {
					const IconComponent = icons[icon as keyof typeof icons];

					return [
						<MenuItem
							key={id}
							onClick={() => handleOnMenuClose(action)}
							disabled={disabled || loading}
							selected={selected}
						>
							<>
								{loading ? (
									<CircularProgress
										size={16}
										sx={{
											marginRight: 2
										}}
									/>
								) : icon ? (
									<ListItemIcon>
										<IconComponent fontSize="small" />
									</ListItemIcon>
								) : image ? (
									<ListItemIcon>
										<img src={image} alt="" width={20} />
									</ListItemIcon>
								) : null}
							</>
							<ListItemText
								sx={{
									color: theme => (color ? `${theme.palette[color].main}` : undefined)
								}}
							>
								{label}
							</ListItemText>
						</MenuItem>,
						<Divider key={label} sx={{ margin: '0 !important', display: i !== menu.length - 1 ? 'block' : 'none' }} />
					];
				})}
			</MuiMenu>
		</>
	);
};
