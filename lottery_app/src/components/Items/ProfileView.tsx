import { useCallback, useState } from 'react';
import { Flex, Box, VStack, Text, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import type { User as UserType } from 'types/types';

import { useUserContext } from 'contexts/user';
import { useAuthContext } from 'contexts/auth';

import ProfileCard from './ProfileCard';
import ActionButton from 'components/Buttons/ActionButton';

const ProfileView = (): JSX.Element => {
	const user = useUserContext();
	const auth = useAuthContext();
	const toast = useToast();

	// Force re-render components
	const [, updateState] = useState<any>();
	const forceUpdate = useCallback(() => updateState({}), []);
	const history = useHistory();

	const logout = async () => {
		// Clear datas
		auth.logout();

		// Clear user
		user.setUser(undefined);

		// Redirect to login view
		history.push('/login');
	};

	const topUp = async (): Promise<void> => {
		await user.user.topUpAccount(100);
		setTimeout(forceUpdate, 500);
		toast({
			title: 'Top up account success!',
			description: 'Go bet!',
			status: 'success',
			position: 'top',
			isClosable: true,
			duration: 2000,
		});
	};

	return (
		<>
			<Box w="full" h="full">
				<Flex h="full" pb="30%" direction="column" justify="space-between" align="center">
					<VStack w="full">
						<ProfileCard profile={user.user.account as UserType} />
						<ActionButton
							clickAction={topUp}
							content="Top up your account (€100)"
							p="20px"
							px=""
							bg="#026E47"
							opac="70%"
						/>
					</VStack>
					<VStack>
						<Text fontSize="14px" opacity="60%">
							user id: {user.user.account?.uid}
						</Text>
						<ActionButton clickAction={logout} content="Logout" p="20px" px="50px" bg="#F7783D" />
					</VStack>
				</Flex>
			</Box>
		</>
	);
};

export default ProfileView;
