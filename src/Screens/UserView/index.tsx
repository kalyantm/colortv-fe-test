import { Avatar, Box, Grid, Theme, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhotoIcon from '@material-ui/icons/Photo';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PhotoListGrid from '../../components/PhotoListGrid';

export interface UserInfo {
	username: string;
	first_name: string;
	last_name: string;
	profile_image: {
		small: string;
		regular: string;
		large: string;
	};
	total_likes: number;
	total_photos: number;
}

const UserView = () => {
	const classes = useStyles();
	const [photos, setPhotos] = React.useState([]);
	const [userInfo, setUserInfo] = React.useState<UserInfo | undefined>(undefined);
	const location = useLocation();
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const page = query.get('page');

	const username = location.pathname.split('/')[2];
	const PER_PAGE = 20;
	React.useEffect(() => {
		const fetchPhotos = async () => {
			const res = await axios.get(`https://api.unsplash.com/users/${username}/photos`, {
				params: {
					per_page: PER_PAGE,
					page: page ? page : 1,
				},
				headers: {
					Authorization: 'Client-ID aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5',
				},
			});
			setPhotos(res.data);
		};

		const fetchUserData = async () => {
			const res = await axios.get(`https://api.unsplash.com/users/${username}`, {
				headers: {
					Authorization: 'Client-ID aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5',
				},
			});
			setUserInfo(res.data);
		};
		fetchPhotos();
		fetchUserData();
	}, [page, username]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Box display="flex" flexDirection="column" alignItems="center" className={classes.headerWrapper}>
					<Box display="flex" mt={2}>
						<Avatar
							className={classes.avatar}
							src={userInfo?.profile_image.large}
							alt={userInfo?.username}
						/>
						<Box display="flex" flexDirection="column" ml={4}>
							<Typography variant="h4">
								{userInfo?.first_name} {userInfo?.last_name}
							</Typography>
							<Box display="flex">
								<Box display="flex">
									<FavoriteIcon color="error" />
									<Typography variant="body1">{userInfo?.total_likes}</Typography>
								</Box>

								<Box display="flex" ml={2}>
									<PhotoIcon />
									<Typography variant="body1">{userInfo?.total_photos}</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={10}>
				{photos.length > 0 ? (
					<PhotoListGrid photos={photos} />
				) : (
					<Box display="flex" justifyContent="center">
						<Typography>{userInfo?.username} has not added any photos yet!</Typography>
					</Box>
				)}
			</Grid>
			{photos?.length > 0 && (
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center">
						<Pagination
							page={parseInt(page as string, 10)}
							count={userInfo ? Math.ceil(userInfo?.total_photos / PER_PAGE) : 0}
							siblingCount={0}
							boundaryCount={2}
							renderItem={(item) => (
								<PaginationItem
									component={Link}
									to={`/users/${username}${item.page === 1 ? '' : `?page=${item.page}`}`}
									{...item}
								/>
							)}
						/>
					</Box>
				</Grid>
			)}
		</Grid>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
	headerWrapper: {},
	avatar: {
		height: 128,
		width: 128,
	},
}));

export default UserView;
