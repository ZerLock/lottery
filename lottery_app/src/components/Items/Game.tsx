import { Box, Text, VStack, Flex, Badge } from '@chakra-ui/react';
import ActionButton from 'components/Buttons/ActionButton';
// import { Timestamp } from 'firebase/firestore';
import { Game as GameType } from 'types/types';

type GameProps = {
	clickAction: () => void;
	game: GameType;
};

const Game = ({ clickAction, game }: GameProps): JSX.Element => (
	<Box w="100vw">
		<VStack
			id={game.id}
			bg="rgba(2, 110, 71, 0.7)"
			w="95%"
			mx="10px"
			p="20px"
			py="25px"
			color="white"
			borderRadius="20px"
			spacing={0}
			overflowY="scroll"
			boxShadow="md"
		>
			<Flex w="100%" px="20px" justify="space-between">
				<VStack align="left" spacing={-1}>
					<Text fontSize="16px" opacity="60%">
						{game.name}
					</Text>
					<Text fontSize="24px">€{game.total_cash * 0.9}</Text>
				</VStack>
				<ActionButton clickAction={clickAction} content="Play" p="10px" px="20px" bg="#F7783D" />
			</Flex>
			<Flex w="100%" px="20px" wrap="wrap" justify="left" gap="7px">
				<Badge colorScheme="cyan" p="3px" px="15px" alignItems="center">
					{/* <Text>{game.played_at.toDate().toLocaleString()}</Text> */}
					<Text>November 14</Text>
				</Badge>
				<Badge colorScheme="cyan" p="3px" px="15px" alignItems="center">
					<Text>3:00 PM</Text>
				</Badge>
			</Flex>
		</VStack>
	</Box>
);

export default Game;
