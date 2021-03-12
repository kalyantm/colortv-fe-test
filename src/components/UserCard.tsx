import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from '../Screens/UserView/index';

const UserCard = ({ userInfo }: { userInfo: UserInfo }) => {
	const classes = useStyles();
	return (
		<Link className={classes.link} to={`/users/${userInfo.username}`}>
			<Box className={classes.wrapper}>
				<Avatar className={classes.avatar} src={userInfo?.profile_image.large} alt={userInfo?.username} />
				<Box mt={1} display="flex" justifyContent="center">
					<Typography>{userInfo?.username}</Typography>
				</Box>
			</Box>
		</Link>
	);
};

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
		color: '#000',
		display: 'flex',
		justifyContent: 'center',
		width: '256px',
		maxHeight: '225px',
	},
	wrapper: {
		height: '100%',
		display: 'block',
		padding: theme.spacing(3, 2),
		borderRadius: '10px',
	},
	avatar: {
		height: 128,
		width: 128,
	},
}));

export default UserCard;
