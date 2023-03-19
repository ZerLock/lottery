import { Modal, ModalBody, ModalOverlay, ModalContent, ModalFooter, Box, Text } from '@chakra-ui/react';
import { FaSadCry } from 'react-icons/fa';
import { Fireworks } from '@fireworks-js/react';

import ActionButton from 'components/Buttons/ActionButton';

type ClaimModalProps = {
	isOpen: boolean;
	onClose: () => void;
	claimedPrize: number;
	playCash: number;
};

const ClaimModal = ({ isOpen, onClose, claimedPrize, playCash }: ClaimModalProps): JSX.Element => (
	<>
		<Modal size="xs" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bgColor="#F4E2C2">
				<ModalBody w="full" justifyContent="center" pt="20px">
					{claimedPrize > 0 ? (
						<>
							<Box mx="15px" border="4px" w="250px" h="250px" borderColor="white">
								<Fireworks
									options={{
										rocketsPoint: {
											min: 0,
											max: 100,
										},
									}}
									style={{
										background: '#000',
										width: '100%',
										height: '100%',
									}}
								/>
							</Box>
							<Text mt="15px" fontSize="24px" textAlign="center">
								You won €{claimedPrize} !
							</Text>
						</>
					) : (
						<>
							<Box mx="15px" w="250px" h="250px">
								<FaSadCry size="100%" />
							</Box>
							<Text mt="15px" fontSize="24px" textAlign="center">
								You lose €{playCash}...
							</Text>
						</>
					)}
				</ModalBody>
				<ModalFooter w="full" justifyContent="center">
					<ActionButton
						clickAction={onClose}
						content="Continue"
						p="25px"
						px="40px"
						bg="#026E47"
						opac="70%"
						radius="10px"
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	</>
);

export default ClaimModal;
