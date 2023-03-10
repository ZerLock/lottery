import GamesView from './GamesView';
import ProfileView from './ProfileView';
import ResultsView from './ResultsView';

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
		return <ResultsView />;
	}
	// Profile
	return <ProfileView />;
};

export default DisplayViews;
