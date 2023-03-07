import { extendTheme } from '@chakra-ui/react';

const overrides = {
	breakpoints: {
		xs: '320px',
		sm: '576px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1440px',
	},
	fonts: {
		body: `'Source Sans Pro'`,
	},
};

export default extendTheme(overrides);
