import { HStack, Text } from '@chakra-ui/react';
import { GoCalendar } from 'react-icons/go';
import { BsClock } from 'react-icons/bs';

type DateInfosProps = {
	date: string;
	hour: string;
};

const DateInfos = ({ date, hour }: DateInfosProps): JSX.Element => (
	<>
		<HStack justify="space-around" bg="#E4CEAC" borderRadius="25px" px="25px" h="75px">
			<HStack>
				<GoCalendar size="15%" />
				<Text>{date}</Text>
			</HStack>
			<HStack>
				<BsClock size="15%" />
				<Text>{hour}</Text>
			</HStack>
		</HStack>
	</>
);

export default DateInfos;
