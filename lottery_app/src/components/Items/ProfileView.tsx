import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, VStack, Text } from '@chakra-ui/react';

import ProfileCard from './ProfileCard';
import ActionButton from 'components/Buttons/ActionButton';

import { useUserContext } from 'contexts/user';
import { useAuthContext } from 'contexts/auth';

import type { User as UserType } from 'types/types';

const ProfileView = (): JSX.Element => {
	const user = useUserContext();
	const auth = useAuthContext();
	const [, updateState] = useState<any>();
	const forceUpdate = useCallback(() => updateState({}), []);
	const [profile, setProfile] = useState<UserType>({
		uid: 'unknown',
		name: 'Unknown',
		normalized_name: 'https://bit.ly/broken-link',
		avatar: 'Unknown',
		cash: 0,
		number_of_grids: 0,
		current_games: [],
		old_games: [],
	});
	const history = useHistory();

	useEffect(() => {
		(async () => {
			// Get user profile
			setProfile(user.user.getAccount());
		})();
	}, [user, profile]);

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
		forceUpdate();
	};

	return (
		<>
			<Box w="full" h="full">
				<Flex h="full" pb="30%" direction="column" justify="space-between" align="center">
					<VStack w="full">
						<ProfileCard profile={profile} />
						<ActionButton
							clickAction={topUp}
							content="To up your account (€100)"
							p="20px"
							px=""
							bg="#026E47"
							opac="70%"
						/>
					</VStack>
					<VStack>
						<Text fontSize="14px" opacity="60%">
							user id: {profile.uid}
						</Text>
						<ActionButton clickAction={logout} content="Logout" p="20px" px="50px" bg="#F7783D" />
					</VStack>
				</Flex>
			</Box>
		</>
	);
};

export default ProfileView;
