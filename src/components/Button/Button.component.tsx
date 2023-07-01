import MuiButton from '@mui/material/Button';
import { icons } from 'components/icons';
import { Tooltip } from 'components/Tooltip';
import { CustomButtonProps } from './Button.types';
import CircularProgress from '@mui/material/CircularProgress';

export const Button = ({
	tooltip,
	loading,
	startIcon,
	endIcon,
	startImage,
	endImage,
	children,
	noLabel = false,
	...props
}: CustomButtonProps) => {
	const StartIcon = icons[startIcon as keyof typeof icons];
	const EndIcon = icons[endIcon as keyof typeof icons];

	const button = (
		<MuiButton
			{...props}
			disabled={props.disabled || loading}
			startIcon={
				!loading ? (
					startIcon ? (
						<StartIcon />
					) : startImage ? (
						<img src={startImage} alt="" width={20} />
					) : undefined
				) : undefined
			}
			endIcon={
				!loading ? endIcon ? <EndIcon /> : endImage ? <img src={endImage} alt="" width={20} /> : undefined : undefined
			}
			className={noLabel ? 'no-label' : undefined}
		>
			{loading ? (
				<CircularProgress
					color="inherit"
					sx={{
						marginRight: 2
					}}
				/>
			) : null}
			{!noLabel ? children : null}
		</MuiButton>
	);

	return (
		<>
			{tooltip ? <Tooltip label={tooltip}>{props.disabled ? <span>{button}</span> : button}</Tooltip> : <>{button}</>}
		</>
	);
};
