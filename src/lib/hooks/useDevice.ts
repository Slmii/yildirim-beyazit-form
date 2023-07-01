import { useEffect, useState } from 'react';

export const useDevice = () => {
	const [width, setWidth] = useState(992);

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		setWidth(window.innerWidth);

		window.addEventListener('resize', handleWindowSizeChange);

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	// Match breakpoints from MUI
	return {
		isMobile: width <= 900,
		isDesktop: width >= 901
	};
};
