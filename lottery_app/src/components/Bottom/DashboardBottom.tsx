import { Box, Button, Flex, Text, Image } from '@chakra-ui/react';

type DashboardBarProps = {
	clickAction: React.Dispatch<React.SetStateAction<number>>;
	selectedTab: number;
};

const DashboardBar = ({ clickAction, selectedTab }: DashboardBarProps): JSX.Element => {
	const BottomBarProps = [
		{
			image_src: 'menu.png',
			image_alt: 'games',
			text: 'Games',
		},
		{
			image_src: 'results.png',
			image_alt: 'result',
			text: 'Results',
		},
		{
			image_src: 'profile.png',
			image_alt: 'profile',
			text: 'Profile',
		},
	];

	return (
		<>
			<Box w="full" userSelect="none" minH="80px">
				<Flex bg="#E4CEAC" mx="10px" justify="space-around" px="20px" py="12px" borderRadius="25px" boxShadow="md">
					{BottomBarProps.map((value, index) => (
						<Button
							key={index}
							bgColor="transparent"
							variant="ghost"
							_focus={{ background: 'transparent' }}
							textDecoration={selectedTab === index ? 'underline' : 'none'}
							onClick={() => clickAction(index)}
						>
							<Flex key={index} direction="column" textAlign="center" align="center">
								<Image src={`/assets/${value.image_src}`} alt={value.image_alt} w="25px" h="25px" />
								<Text fontSize="12px" fontWeight="bold">
									{value.text}
								</Text>
							</Flex>
						</Button>
					))}
				</Flex>
			</Box>
		</>
	);
};

export default DashboardBar;
