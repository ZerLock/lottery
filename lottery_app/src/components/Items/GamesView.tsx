import { useEffect, useState } from 'react';
import { Box, useDisclosure, VStack } from '@chakra-ui/react';
import { Game as GameType } from 'types/types';

import Game from './Game';

import { useUserContext } from 'contexts/user';
import NewGridModal from 'components/Modals/NewGridModal';

const GamesView = (): JSX.Element => {
	const user = useUserContext();

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

		await user.user.playNewGrid(numbers, selectedGame.id);
		setSelectedGame(undefined);
	};

	return (
		<>
			<VStack spacing="6px" pb="100px">
				{games.map((value, index) => (
					<Box key={index}>
						<Game clickAction={() => fillNewGrid(value)} game={value} />
					</Box>
				))}
				<NewGridModal isOpen={isOpen} onClose={onClose} clickAction={playGrid} game={selectedGame} />
			</VStack>
		</>
	);
};

export default GamesView;
