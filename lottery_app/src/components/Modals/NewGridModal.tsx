import { useState } from 'react';
import {
	Modal,
	ModalBody,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	HStack,
	VStack,
	Text,
} from '@chakra-ui/react';
import { GiMoneyStack } from 'react-icons/gi';
import { Game as GameType } from 'types/types';

import { useUserContext } from 'contexts/user';

import ActionButton from 'components/Buttons/ActionButton';
import CloseModalButton from 'components/Buttons/CloseModalButton';
import DateInfos from './DateInfos';
import Grid from 'components/Items/Grid';

type NewGridModalProps = {
	isOpen: boolean;
	onClose: () => void;
	clickAction: (numbers: Array<number>) => void;
	game: GameType | undefined;
};

const NewGridModal = ({ isOpen, onClose, clickAction, game }: NewGridModalProps): JSX.Element => {
	const user = useUserContext();
	const [numbers, setNumbers] = useState<Array<number>>([]);

	if (!game) return <></>;

	const onNumbersChange = (playedNumbers: Array<number>): void => {
		setNumbers(playedNumbers);
	};

	const closeModal = (): void => {
		clickAction(numbers);
		onClose();
	};

	return (
		<>
			<Modal size="full" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent pt={user.user.isOnApple() ? '50px' : '25px'} bgColor="#F4E2C2">
					<ModalHeader>
						<HStack justify="center" w="full">
							<Text textAlign="center" fontSize="32px">
								€{game.total_cash * 0.9}
							</Text>
							<CloseModalButton clickAction={onClose} />
						</HStack>
						<Text textAlign="center" fontSize="16px" opacity="60%">
							{game.name}
						</Text>
					</ModalHeader>
					<ModalBody>
						<VStack spacing="15px">
							<DateInfos date="Today" hour="10:10:00" />
							<Grid onNumbersChange={onNumbersChange} />
							<HStack w="full" justify="start">
								<GiMoneyStack size="30px" />
								<Text fontSize="18px">
									Bet amount: <b>€{game.play_cash}</b>
								</Text>
							</HStack>
						</VStack>
					</ModalBody>
					<ModalFooter w="full" minH="80px" pos="absolute" bottom="1.5%" justifyContent="center">
						<ActionButton
							clickAction={closeModal}
							content="Confirm"
							p="30px"
							px="40px"
							bg="#026E47"
							opac="70%"
							radius="30px"
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default NewGridModal;
