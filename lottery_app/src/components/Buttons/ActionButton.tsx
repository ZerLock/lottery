import { Button, Text } from '@chakra-ui/react';

type ActionButtonProps = {
	clickAction: () => void;
	content: string;
	p: string;
	px: string;
	bg: string;
	opac?: string;
	radius?: string;
};

const ActionButton = ({ clickAction, content, p, px, bg, opac, radius }: ActionButtonProps) => (
	<>
		<Button
			w="max-content"
			bg={bg}
			borderRadius={radius ? radius : '10px'}
			opacity={opac ? opac : '100%'}
			variant="solid"
			_focus={{ background: bg }}
			p={p}
			px={px}
			onClick={clickAction}
		>
			<Text color="white">{content}</Text>
		</Button>
	</>
);

export default ActionButton;
