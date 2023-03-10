import _ from 'lodash';
import { useState, useCallback } from 'react';
import { SimpleGrid, Box, VStack, HStack, Text, GridItem } from '@chakra-ui/react';
import RandomButton from 'components/Buttons/RandomButton';

type GridProps = {
	onNumbersChange: (numbers: Array<number>) => void;
};

const Grid = ({ onNumbersChange }: GridProps): JSX.Element => {
	// Number that the user can choose
	const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

	// Force re-render of component
	const [, updateState] = useState<any>();
	const forceUpdate = useCallback(() => updateState({}), []);

	const [numbers, setNumbers] = useState<Array<number>>([]);

	const chooseRandom = (): void => {
		// Reset numbers
		setNumbers([]);

		// Temporary available numbers (found numbers will be pull of this array)
		const tmp = availableNumbers;

		// Number of number found
		let found = 0;

		// New numbers array
		const newNumbers: Array<number> = [];

		while (found < 5) {
			// Get random number
			const newNumber = _.sample(tmp);

			// If it exists
			if (newNumber) {
				found++;
				_.pull(tmp, newNumber);
				newNumbers.push(newNumber);
			}
		}
		setNumbers(newNumbers);
		onNumbersChange(newNumbers);
		forceUpdate();
	};

	const selectNumber = (value: number): void => {
		if (_.find(numbers, (elem) => elem === value)) {
			setNumbers(_.pull(numbers, value));
		} else {
			if (numbers.length < 5) {
				setNumbers(_.concat(numbers, value));
			}
		}
		onNumbersChange(numbers);
		forceUpdate();
	};

	return (
		<>
			<Box bg="#026E47" opacity="70%" p="10px" borderRadius="20px">
				<VStack opacity="unset" spacing="10px">
					<HStack color="white" justify="space-between" w="full" px="10px" h="50px">
						<Text fontSize="24px">Select 5 numbers</Text>
						<RandomButton clickAction={chooseRandom} />
					</HStack>
					<SimpleGrid w="full" columns={5} spacingX="16px" spacingY="8px" px="10px">
						{availableNumbers.map((value) => (
							<GridItem key={value}>
								<Box
									onClick={() => selectNumber(value)}
									bgColor={_.find(numbers, (elem) => elem === value) ? 'yellow.400' : 'white'}
									_focus={{ background: _.find(numbers, (elem) => elem === value) ? 'white' : 'yellow.400' }}
									h="50px"
									w="50px"
									textAlign="center"
									pt="14px"
									borderRadius="50px"
								>
									<Text fontWeight="bold">{value}</Text>
								</Box>
							</GridItem>
						))}
					</SimpleGrid>
				</VStack>
			</Box>
		</>
	);
};

export default Grid;
