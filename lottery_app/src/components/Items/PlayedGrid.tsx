import { useState } from 'react';
import { VStack, HStack, Box, Text, Badge, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { Grid as GridType } from 'types/types';
import { useUserContext } from 'contexts/user';
import ActionButton from 'components/Buttons/ActionButton';
import ClaimModal from 'components/Modals/ClaimModal';

type PlayedGridProps = {
	grid: GridType;
};

const PlayedGrid = ({ grid }: PlayedGridProps) => {
	const user = useUserContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [claimedPrize, setClaimedPrize] = useState<number>(0);

	const isFinished = (): boolean => {
		if (grid.claimed_cash !== null) {
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
		if (isFinished()) {
			return '50%';
		}
		return '0%';
	};

	const claimPrize = async (): Promise<void> => {
		const res: any = await user.user.claimGrid(grid.id);
		setClaimedPrize(res.prize);
		setTimeout(onOpen, 500);
	};

	return (
		<>
			<ClaimModal
				isOpen={isOpen}
				onClose={onClose}
				gameName={grid.game.name as string}
				claimedPrize={claimedPrize}
				playCash={grid.game.play_cash as number}
			/>
			<Box w="full" filter={`grayscale(${getBrightness()})`}>
				<Box bg="rgba(2, 110, 71, 0.7)" p="10px" mx="10px" borderRadius="20px">
					<VStack spacing="10px">
						<VStack spacing="2px" w="full" px="10px" color="white" align="start">
							<HStack w="full" justify="space-between">
								<Text color="#F7783D" fontWeight="bold" fontStyle="italic" fontSize="24px">
									{isFinished() ? `${grid.title}!` : 'Waiting...'}
								</Text>
								<Badge colorScheme="cyan" p="3px" px="15px" alignContent="center">
									<Text>{grid.game.played_at?.toDate().toDateString()}</Text>
								</Badge>
							</HStack>
							<HStack w="full" justify="space-between">
								<Box>
									<Text fontWeight="bold" fontSize="18px">
										{grid.game.name}
									</Text>
									<Text fontWeight="bold" fontSize="">
										€{grid.claimed_cash ? grid.claimed_cash : 'NaN'} / €{grid.game.total_cash}
									</Text>
								</Box>
								<Box>
									{displayClaimButton() && !isFinished() ? (
										<>
											<ActionButton clickAction={claimPrize} content="🔥 Claim!" p="10px" px="20px" bg="#F7783D" />
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
