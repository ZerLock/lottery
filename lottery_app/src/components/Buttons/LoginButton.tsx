import { Button, Text } from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';

type LoginButtonProps = {
	clickAction: () => void;
	isLoading: boolean;
};

const LoginButton = ({ clickAction, isLoading }: LoginButtonProps): JSX.Element => (
	<>
		<Button w="max-content" bgColor="white" leftIcon={<FcGoogle />} isLoading={isLoading} onClick={clickAction}>
			<Text color="gray">Continue with Google</Text>
		</Button>
	</>
);

export default LoginButton;
