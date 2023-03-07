import { Box, Text, VStack, Flex, Badge } from '@chakra-ui/react';
import ActionButton from 'components/Buttons/ActionButton';

type GameProps = {
	clickAction: () => void;
	id: string;
	name: string;
	cash: number;
	date: Date;
};

const Game = ({ clickAction, id, name, cash, date }: GameProps): JSX.Element => (
	<Box w="100vw">
		<VStack
			id={id}
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
						{name}
					</Text>
					<Text fontSize="24px">€{cash}</Text>
				</VStack>
				<ActionButton clickAction={clickAction} content="Play" p="10px" px="20px" />
			</Flex>
			<Flex w="100%" px="20px" wrap="wrap" justify="left" gap="7px">
				<Badge colorScheme="cyan" p="3px" px="15px" alignItems="center">
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
