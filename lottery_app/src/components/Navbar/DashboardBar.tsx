import { Text, Flex } from '@chakra-ui/react';

import SearchButton from 'components/Buttons/SearchButton';

const DashboardBar = (): JSX.Element => (
	<>
		<Flex mt="35px" pl="40px" pr="10px" w="100%" justify="space-between" align="center">
			<Text fontSize="36px" fontWeight="bold">
				Play now!
			</Text>
			<SearchButton clickAction={() => {}} />
		</Flex>
	</>
);

export default DashboardBar;
