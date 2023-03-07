import { useEffect, useState } from 'react';
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
	const [profile, setProfile] = useState<UserType>({
		uid: 'unknown',
		name: 'Unknown',
		normalized_name: 'https://bit.ly/broken-link',
		avatar: 'Unknown',
		cash: 0,
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

	return (
		<>
			<Box w="full" h="full">
				<Flex h="full" pb="30%" direction="column" justify="space-between" align="center">
					<ProfileCard profile={profile} />
					<VStack>
						<Text fontSize="14px" opacity="60%">
							user id: {profile.uid}
						</Text>
						<ActionButton clickAction={logout} content="Logout" p="20px" px="50px" />
					</VStack>
				</Flex>
			</Box>
		</>
	);
};

export default ProfileView;
