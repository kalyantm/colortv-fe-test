import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootLayout from './Screens/RootLayout';
import Theme from './Theme';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<MuiThemeProvider theme={Theme}>
				<RootLayout />
			</MuiThemeProvider>
		</BrowserRouter>
	);
};

export default App;
