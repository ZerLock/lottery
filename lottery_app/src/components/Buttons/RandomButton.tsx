import { Button } from '@chakra-ui/react';
import { MdLoop } from 'react-icons/md';

type RandomButtonProps = {
	clickAction: () => void;
};

const RandomButton = ({ clickAction }: RandomButtonProps): JSX.Element => (
	<>
		<Button onClick={clickAction} _focus={{ background: 'transparent' }} px="-0.5" bg="transparent">
			<MdLoop size="40px" />
		</Button>
	</>
);

export default RandomButton;
