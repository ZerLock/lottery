import { Box, VStack, HStack, Card, CardBody, Avatar, Text } from '@chakra-ui/react';
import type { User as UserType } from 'types/types';

type ProfileCardProps = {
	profile: UserType;
};

const ProfileCard = ({ profile }: ProfileCardProps): JSX.Element => (
	<>
		<Box w="full">
			<Card mx="10px" bg="whiteAlpha.700" fontWeight="bold" boxShadow="md">
				<CardBody px="10%">
					<VStack align="start" spacing="6px">
						<HStack spacing="15px" align="center">
							<Avatar name={profile.name} src={profile.avatar} />
							<VStack spacing="-6px" align="start">
								<Text fontSize="14px" opacity="50%">
									Welcome
								</Text>
								<Text fontSize="20px">{profile.name}</Text>
							</VStack>
						</HStack>
						<Text fontSize="24px">€{profile.cash}</Text>
					</VStack>
				</CardBody>
			</Card>
		</Box>
	</>
);

export default ProfileCard;
