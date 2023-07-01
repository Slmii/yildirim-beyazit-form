import Stack from '@mui/material/Stack';
import { useDevice } from 'lib/hooks/useDevice';
import { PropsWithChildren } from 'react';

export const ButtonsGroup = ({ children, spacing = 1 }: PropsWithChildren<{ spacing?: number }>) => {
	const { isMobile } = useDevice();

	return (
		<Stack direction={isMobile ? 'column' : 'row'} justifyContent="flex-start" spacing={spacing} sx={{ width: '100%' }}>
			{children}
		</Stack>
	);
};
