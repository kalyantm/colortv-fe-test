import { Box, Grid, IconButton, InputAdornment, OutlinedInput, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React from 'react';
import UserListGrid from '../../components/UserListGrid';

const LandingScreen = () => {
	const classes = useStyles();
	const searchRef = React.useRef<HTMLInputElement>(null);
	const [userList, setUserList] = React.useState([]);

	const fetchUsers = async () => {
		return axios.get('https://api.unsplash.com/search/users', {
			params: { query: searchRef.current?.value },
			headers: {
				Authorization: 'Client-ID aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5',
			},
		});
	};

	const searchUsers = async (event: React.FormEvent) => {
		event.preventDefault();
		fetchUsers().then((res) => setUserList(res.data.results));
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Box display="flex" flexDirection="column" alignItems="center" className={classes.headerWrapper}>
					<Box mt={2}>
						<Typography variant="h2">Welcome to Unsplash Search</Typography>
					</Box>
					<Box mt={2}>
						<Typography variant="body1">Explore content from 1000+ users</Typography>
					</Box>
					<Box mt={2} className={classes.searchWrapper}>
						<form onSubmit={searchUsers}>
							<OutlinedInput
								endAdornment={
									<InputAdornment position="end">
										<IconButton edge="end" type="submit">
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								}
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
								inputRef={searchRef}
							/>
						</form>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={10} className={classes.wrapper}>
				{userList.length > 0 ? (
					<UserListGrid users={userList} />
				) : (
					<Box display="flex" justifyContent="center">
						<Typography>Search for some (other) users.</Typography>
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	headerWrapper: {
		background: 'hotpink',
	},
	wrapper: {
		margin: '0 auto',
		paddingTop: theme.spacing(6),
	},
	searchWrapper: {
		transform: 'translateY(24px)',
		background: '#fff',
		'& input': {
			padding: theme.spacing(2, 4),
			border: 'none',
		},
	},
}));

export default LandingScreen;
