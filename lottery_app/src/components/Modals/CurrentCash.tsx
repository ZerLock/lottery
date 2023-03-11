import { HStack, Box, Text } from '@chakra-ui/react';
import { HiInformationCircle } from 'react-icons/hi';
import { useUserContext } from 'contexts/user';

const CurrentCash = (): JSX.Element => {
	const user = useUserContext();

	return (
		<>
			<Box w="full">
				<Box bg="#E4CEAC" display="flex" alignItems="center" h="40px" px="15px" borderRadius="10px">
					<HStack mx="-0.5" fontSize="18px">
						<HiInformationCircle />
						<Text>
							Current balance: <b>€{user.user.account?.cash}</b>
						</Text>
					</HStack>
				</Box>
			</Box>
		</>
	);
};

export default CurrentCash;
