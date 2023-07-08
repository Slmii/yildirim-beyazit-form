import Stack from '@mui/material/Stack';
import { useDevice } from 'lib/hooks/useDevice';
import { PropsWithChildren } from 'react';

export const ButtonsGroup = ({
	children,
	spacing = 1,
	alignment = 'flex-start'
}: PropsWithChildren<{ spacing?: number; alignment?: 'flex-start' | 'flex-end' | 'center' }>) => {
	const { isMobile } = useDevice();

	return (
		<Stack direction={isMobile ? 'column' : 'row'} justifyContent={alignment} spacing={spacing} sx={{ width: '100%' }}>
			{children}
		</Stack>
	);
};
