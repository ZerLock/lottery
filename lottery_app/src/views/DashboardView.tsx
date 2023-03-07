import { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';

import DashboardBar from 'components/Navbar/DashboardBar';
import DashboardBottom from 'components/Bottom/DashboardBottom';
import DisplayViews from 'components/Items/DisplayViews';

import { useUserContext } from 'contexts/user';

const DashboardView = (): JSX.Element => {
	const user = useUserContext();
	const [selectedTab, setSelectedTab] = useState<number>(0);

	user.user.setDeviceInfos(window.navigator.userAgent);

	return (
		<>
			<Flex direction="column" bgColor="#F4E2C2" h="100vh" justify="space-between">
				<DashboardBar />
				<Box flex="1" overflowY="scroll" mt="20px">
					<DisplayViews index={selectedTab} />
				</Box>
			</Flex>
			<Box pos="absolute" bottom="1.5%" w="full">
				<DashboardBottom selectedTab={selectedTab} clickAction={setSelectedTab} />
			</Box>
		</>
	);
};

export default DashboardView;
