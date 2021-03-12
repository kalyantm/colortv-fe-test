import { Grid } from '@material-ui/core';
import React from 'react';
import UserCard from './UserCard';

const UserListGrid = ({ users }: { users: Array<any> }) => {
	return (
		<Grid container spacing={6}>
			{users.map((userInfo) => (
				<Grid item xs={3}>
					<UserCard userInfo={userInfo} />
				</Grid>
			))}
		</Grid>
	);
};

export default UserListGrid;
