import GamesView from './GamesView';
import ProfileView from './ProfileView';

type DisplayViewsProps = {
	index: number;
};

const DisplayViews = ({ index }: DisplayViewsProps): JSX.Element => {
	if (index === 0) {
		// Games
		return <GamesView />;
	}
	if (index === 1) {
		// Results
		return <></>;
	}
	// Profile
	return <ProfileView />;
};

export default DisplayViews;
