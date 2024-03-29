import { useEffect } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { ImSad } from 'react-icons/im';
import _ from 'lodash';

import { useUserContext } from 'contexts/user';

import PlayedGrid from './PlayedGrid';

const ResultsView = (): JSX.Element => {
	const user = useUserContext();

	const getUserGrids = (): Array<any> =>
		_.reverse(
			_.concat(
				user.user.account?.old_games,
				_.concat(
					_.filter(
						user.user.account?.current_games,
						(value) =>
							value.claimed_cash !== null || user.user.games.filter((game) => game.id === value.game.id).length !== 0,
					),
					_.filter(
						user.user.account?.current_games,
						(value) =>
							value.claimed_cash === null && user.user.games.filter((game) => game.id === value.game.id).length === 0,
					),
				),
			),
		);

	useEffect(() => {}, [user.user]);

	return (
		<>
			<Box w="full" h="full">
				<VStack overflow="scroll" h="full" w="full" pb="100px">
					{getUserGrids().length > 0 ? (
						<>
							{getUserGrids().map((value, index) => (
								<Box w="full" key={index}>
									<PlayedGrid grid={value} />
								</Box>
							))}
						</>
					) : (
						<>
							<VStack mt="40%">
								<ImSad size="50px" />
								<Text fontSize="18px" textAlign="center">
									Haven't bet yet? What are you wating for?
								</Text>
							</VStack>
						</>
					)}
				</VStack>
			</Box>
		</>
	);
};

export default ResultsView;
