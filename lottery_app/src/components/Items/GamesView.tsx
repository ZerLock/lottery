import { useEffect, useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';

import Game from './Game';

import { useUserContext } from 'contexts/user';

const GamesView = (): JSX.Element => {
	const user = useUserContext();
	// TODO: Update any type to Game type when backend is UP
	const [games, setGames] = useState<Array<any>>([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await user.user.getAvailableGames();
				setGames(res);
			} catch (e: any) {
				console.error(e);
			}
			setGames([
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Name of component',
					cash: 679089798,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Loto Frane',
					cash: 899000981,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Name of component',
					cash: 679089798,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Loto Frane',
					cash: 899000981,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Name of component',
					cash: 679089798,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Loto Frane',
					cash: 899000981,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Name of component',
					cash: 679089798,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Loto Frane',
					cash: 899000981,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Name of component',
					cash: 679089798,
				},
				{
					id: 'uuid-890j-Kjl7-JKL9-JKld',
					name: 'Loto Frane',
					cash: 899000981,
				},
			]);
		})();
	}, []);

	return (
		<>
			<VStack spacing="6px" pb="100px">
				{games.map((value, index) => (
					<Box key={index}>
						<Game clickAction={() => {}} id={value.id} name={value.name} cash={value.cash} date={new Date()} />
					</Box>
				))}
			</VStack>
		</>
	);
};

export default GamesView;
