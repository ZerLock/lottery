import { VStack, HStack, Box, Text, Badge } from '@chakra-ui/react';
import _ from 'lodash';
import { Grid as GridType } from 'types/types';
import { useUserContext } from 'contexts/user';
import ActionButton from 'components/Buttons/ActionButton';

type PlayedGridProps = {
	grid: GridType;
};

const PlayedGrid = ({ grid }: PlayedGridProps) => {
	const user = useUserContext();

	const hisFinished = (): boolean => {
		if (grid.claimed_cash) {
			return true;
		}
		return false;
	};

	const displayClaimButton = (): boolean => {
		const tmp = _.filter(user.user.games, { id: grid.game.id });
		const old = _.filter(user.user.account?.old_games, { id: grid.game.id });
		if (tmp.length === 0 && old.length === 0) {
			return true;
		}
		return false;
	};

	const getBrightness = (): string => {
		if (hisFinished()) {
			return '50%';
		}
		return '0%';
	};

	const claimPrice = async (): Promise<void> => {
		await user.user.claimGrid(grid.id);
	};

	return (
		<>
			<Box w="full" filter={`grayscale(${getBrightness()})`}>
				<Box bg="rgba(2, 110, 71, 0.7)" p="10px" mx="10px" borderRadius="20px">
					<VStack spacing="10px">
						<VStack spacing="2px" w="full" px="10px" color="white" align="start">
							<HStack w="full" justify="space-between">
								<Text color="#F7783D" fontWeight="bold" fontStyle="italic" fontSize="24px">
									{hisFinished() ? `${grid.title}!` : 'Waiting...'}
								</Text>
								<Badge colorScheme="cyan" p="3px" px="15px" alignContent="center">
									<Text>November 14</Text>
								</Badge>
							</HStack>
							<HStack w="full" justify="space-between">
								<Box>
									<Text fontWeight="bold" fontSize="18px">
										{grid.game.name}
									</Text>
									<Text fontWeight="bold" fontSize="">
										€{grid.claimed_cash ? grid.claimed_cash : 0} / €{grid.game.total_cash}
									</Text>
								</Box>
								<Box>
									{displayClaimButton() && !hisFinished() ? (
										<>
											<ActionButton clickAction={claimPrice} content="🔥 Claim!" p="10px" px="20px" bg="#F7783D" />
										</>
									) : (
										<></>
									)}
								</Box>
							</HStack>
						</VStack>
						<HStack spacing="16px" px="10px">
							{grid.numbers.map((value) => (
								<Box key={value}>
									<Box bgColor="yellow.400" h="50px" w="50px" textAlign="center" pt="14px" borderRadius="50px">
										<Text fontWeight="bold">{value}</Text>
									</Box>
								</Box>
							))}
						</HStack>
					</VStack>
				</Box>
			</Box>
		</>
	);
};

export default PlayedGrid;
