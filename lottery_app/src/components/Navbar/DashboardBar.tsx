import { Text, Flex } from '@chakra-ui/react';

import SearchButton from 'components/Buttons/SearchButton';

import { useUserContext } from 'contexts/user';

const DashboardBar = (): JSX.Element => {
	const user = useUserContext();

	return (
		<>
			<Flex
				mt="35px"
				pl="40px"
				pr="10px"
				w="100%"
				justify="space-between"
				align="center"
			>
				<Text fontSize="36px" fontWeight="bold">
					Play now!
				</Text>
				<SearchButton clickAction={() => {}} />
			</Flex>
		</>
	);
};

export default DashboardBar;
