import { Button } from '@chakra-ui/react';
import { IoIosClose } from 'react-icons/io';

type CloseModalButtonProps = {
	clickAction: () => void;
};

const CloseModalButton = ({ clickAction }: CloseModalButtonProps): JSX.Element => (
	<>
		<Button onClick={clickAction} px="-0.5" position="absolute" right="20px" bg="transparent">
			<IoIosClose fontWeight="normal" size="50px" />
		</Button>
	</>
);

export default CloseModalButton;
