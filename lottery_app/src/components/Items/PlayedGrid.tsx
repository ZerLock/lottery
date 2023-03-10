import { VStack, HStack, Box, Text, Badge } from '@chakra-ui/react';
import { Grid as GridType } from 'types/types';

type PlayedGridProps = {
	grid: GridType;
};

const PlayedGrid = ({ grid }: PlayedGridProps) => (
	<>
		<Box w="full">
			<Box bg="rgba(2, 110, 71, 0.7)" p="10px" mx="10px" borderRadius="20px">
				<VStack spacing="10px">
					<VStack spacing="2px" w="full" px="10px" color="white" align="start">
						<HStack w="full" justify="space-between">
							<Text color="#F7783D" fontWeight="bold" fontStyle="italic" fontSize="24px">
								You won!
							</Text>
							<Badge colorScheme="cyan" p="3px" px="15px" alignContent="center">
								<Text>November 14</Text>
							</Badge>
						</HStack>
						<Text fontWeight="bold" fontSize="18px">
							{grid.game_name}
						</Text>
						<Text fontWeight="bold" fontSize="">
							€578 829 123
						</Text>
					</VStack>
					<HStack spacing="16px" px="10px">
						{grid.numbers.map((value) => (
							<Box key={value}>
								<Box bgColor="yellow.400" h="50px" w="50px" textAlign="center" pt="14px" borderRadius="50px">
									<Text fontWeight="bold">{value}</Text>
								</Box>
							</Box>
						))}
					</HStack>
				</VStack>
			</Box>
		</Box>
	</>
);

export default PlayedGrid;
