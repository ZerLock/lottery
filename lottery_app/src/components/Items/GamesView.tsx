import { useEffect, useState } from 'react';
import { Box, VStack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { Game as GameType } from 'types/types';

import Game from './Game';

import { useUserContext } from 'contexts/user';
import NewGridModal from 'components/Modals/NewGridModal';

const GamesView = (): JSX.Element => {
	const user = useUserContext();
	const toast = useToast();

	// Modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [games, setGames] = useState<Array<GameType>>([]);
	const [selectedGame, setSelectedGame] = useState<GameType | undefined>(undefined);

	useEffect(() => {
		(async () => {
			try {
				const res = await user.user.getGames();
				setGames(res);
			} catch (e: any) {
				console.error(e);
			}
		})();
	}, []);

	const fillNewGrid = (game: GameType): void => {
		setSelectedGame(game);
		onOpen();
	};

	const playGrid = async (numbers: Array<number>): Promise<void> => {
		if (!selectedGame) {
			return;
		}

		try {
			await user.user.playNewGrid(numbers, selectedGame.id);
			toast({
				title: `You just play on game '${selectedGame.name}'`,
				description: 'May the luck be with you',
				status: 'success',
				position: 'top',
				isClosable: true,
				duration: 2000,
			});
		} catch (e: any) {
			throw new Error(e);
		}
		setSelectedGame(undefined);
	};

	return (
		<>
			<VStack spacing="6px" pb="100px">
				{games.length > 0 ? (
					<>
						{games.map((value, index) => (
							<Box key={index}>
								<Game clickAction={() => fillNewGrid(value)} game={value} />
							</Box>
						))}
					</>
				) : (
					<>
						<VStack mt="40%">
							<FaUmbrellaBeach size="50px" />
							<Text fontSize="18px" textAlign="center">
								Nothing new today, take a rest!
							</Text>
						</VStack>
					</>
				)}
				<NewGridModal isOpen={isOpen} onClose={onClose} clickAction={playGrid} game={selectedGame} />
			</VStack>
		</>
	);
};

export default GamesView;
