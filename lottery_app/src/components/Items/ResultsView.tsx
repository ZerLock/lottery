import { Box, VStack } from '@chakra-ui/react';
import _ from 'lodash';

import { useUserContext } from 'contexts/user';

import PlayedGrid from './PlayedGrid';

const ResultsView = (): JSX.Element => {
	const user = useUserContext();

	const getUserGrids = (): Array<any> => _.concat(user.user.account?.current_games, user.user.account?.old_games);

	return (
		<>
			<Box w="full" h="full">
				<VStack overflow="scroll" w="full" pb="100px">
					{getUserGrids().map((value, index) => (
						<Box w="full" key={index}>
							<PlayedGrid grid={value} />
						</Box>
					))}
				</VStack>
			</Box>
		</>
	);
};

export default ResultsView;
