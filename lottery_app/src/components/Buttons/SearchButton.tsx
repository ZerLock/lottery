import { Button } from '@chakra-ui/react';

import { BiSearch } from 'react-icons/bi';

type SearchButtonProps = {
	clickAction: () => void;
};

const SearchButton = ({ clickAction }: SearchButtonProps): JSX.Element => (
	<>
		<Button _focus={{ background: '#E4CEAC' }} bg="#E4CEAC" onClick={clickAction}>
			<BiSearch />
		</Button>
	</>
);

export default SearchButton;
