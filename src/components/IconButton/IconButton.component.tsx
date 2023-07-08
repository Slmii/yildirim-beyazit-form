import MUIIconButton from '@mui/material/IconButton';
import { Icon } from 'components/Icon';
import { Tooltip } from 'components/Tooltip';
import { CustomIconButtonProps } from './IconButton.types';
import slugify from 'slugify';
import CircularProgress from '@mui/material/CircularProgress';

export const IconButton = ({
	icon,
	tooltip,
	loading,
	color = 'inherit',
	noPadding,
	...props
}: CustomIconButtonProps) => {
	return (
		<Tooltip label={tooltip}>
			{props.disabled ? (
				<span>
					<MUIIconButton
						{...props}
						sx={{
							...props.sx,
							padding: noPadding ? 0 : undefined
						}}
						color={color}
						aria-label={slugify(tooltip)}
						disabled={props.disabled || loading}
					>
						{loading ? <CircularProgress size={20} color="inherit" /> : <Icon icon={icon} fontSize={props.size} />}
					</MUIIconButton>
				</span>
			) : (
				<MUIIconButton
					{...props}
					sx={{
						...props.sx,
						padding: noPadding ? 0 : undefined
					}}
					color={color}
					aria-label={slugify(tooltip)}
					disabled={props.disabled || loading}
				>
					{loading ? <CircularProgress size={20} color="inherit" /> : <Icon icon={icon} fontSize={props.size} />}
				</MUIIconButton>
			)}
		</Tooltip>
	);
};
