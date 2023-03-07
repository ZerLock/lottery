import { Button, Text } from '@chakra-ui/react';

type ActionButtonProps = {
	clickAction: () => void;
	content: string;
	p: string;
	px: string;
};

const ActionButton = ({ clickAction, content, p, px }: ActionButtonProps) => (
	<>
		<Button
			w="max-content"
			bg="#F7783D"
			variant="solid"
			_focus={{ background: '#F7783D' }}
			_active={{ background: '#F7783D' }}
			_after={{ background: '#F7783D' }}
			p={p}
			px={px}
			onClick={clickAction}
		>
			<Text color="white">{content}</Text>
		</Button>
	</>
);

export default ActionButton;
