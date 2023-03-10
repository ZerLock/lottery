import { useState, useEffect } from 'react';
import { Text, Image, VStack, Box, Flex, useToast } from '@chakra-ui/react';

import LoginButton from 'components/Buttons/LoginButton';

import { useAuthContext } from 'contexts/auth';
import { useUserContext } from 'contexts/user';

const LoginView = (): JSX.Element => {
	const auth = useAuthContext();
	const user = useUserContext();

	const [isLoadingWithGoogle, setIsLoadingWithGoogle] = useState<boolean>(false);

	const toast = useToast();

	useEffect(() => {
		(async () => {
			if (auth.isConnected()) {
				// const login = await auth.getConnectedUser();
				// user.setUser(login.user);
			}
		})();
	}, [auth]);

	const loginWithGoogle = async (): Promise<void> => {
		setIsLoadingWithGoogle(true);
		const login = await auth.loginWithGoogle();
		setIsLoadingWithGoogle(false);

		if (login.user) {
			toast({
				containerStyle: {
					marginTop: '50px',
				},
				title: login.message,
				status: 'success',
				duration: 2000,
				isClosable: true,
				position: 'top',
			});
			user.setUser(login.user);
		} else {
			toast({
				containerStyle: {
					marginTop: '50px',
				},
				title: login.message,
				status: 'error',
				duration: 2000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	return (
		<>
			<VStack bg="rgba(2, 110, 71, 0.7)" h="100vh" pt="30%">
				<Flex h="full" direction="column" justifyContent="space-between" mb="10%">
					<VStack>
						<Text color="white" fontSize="48px" fontWeight="bold">
							Play and win!
						</Text>
						<Text color="white" fontSize="20px" fontWeight="bold" textAlign="center" opacity="60%" px="40px">
							Game for anyone who like to try luck at guessing numbers
						</Text>
						<Image src="/assets/login_illustration.svg" alt="login image" p="10px" />
					</VStack>
					<Box textAlign="center">
						<LoginButton clickAction={loginWithGoogle} isLoading={isLoadingWithGoogle} />
					</Box>
				</Flex>
			</VStack>
		</>
	);
};

export default LoginView;
